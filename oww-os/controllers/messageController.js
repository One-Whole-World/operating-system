const messageService = require("../services/messageService");
const systemService = require("../services/systemService");
const logger = require("../utils/logger");
const axios = require("axios");

class MessageController {
  async sendMessage(req, res, next) {
    try {
      const { fromSystemId, toSystemId } = req.body;

      const fromSystem = systemService.getSystem(fromSystemId);
      const toSystem = systemService.getSystem(toSystemId);

      if (!fromSystem || !toSystem) {
        return res.status(404).json({
          success: false,
          error: "One or both systems not found",
        });
      }

      const message = messageService.sendMessage(req.body);

      console.log(
        "message received from ",
        fromSystem.name,
        " ",
        "to ",
        toSystem.name,
        " ",
        "message",
        " ",
        message
      );

      try {
        const forwardResponse = await axios.post(
          `http://localhost:4002/receive`,
          {
            fromSystemId: message.fromSystemId,
            toSystemId: message.toSystemId,
            messageType: message.messageType,
            payload: message.payload,
            messageId: message.messageId,
            timestamp: message.timestamp,
          }
        );

        console.log("✅ Message successfully forwarded to", toSystem.name);
      } catch (forwardError) {
        console.error(
          "❌ Failed to forward message to",
          toSystem.name,
          ":",
          forwardError.message
        );
      }

      res.status(201).json({
        success: true,
        messageId: message.messageId,
        message: "Message queued for delivery",
      });
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req, res, next) {
    try {
      const { systemId } = req.params;

      if (!systemService.getSystem(systemId)) {
        return res.status(404).json({
          success: false,
          error: "System not found",
        });
      }

      const messages = messageService.getMessages(systemId);

      res.json({
        success: true,
        messages,
        count: messages.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async acknowledgeMessage(req, res, next) {
    try {
      const { messageId, systemId, status } = req.body;
      const acknowledged = messageService.acknowledgeMessage(
        messageId,
        systemId,
        status
      );

      if (!acknowledged) {
        return res.status(404).json({
          success: false,
          error: "Message not found",
        });
      }

      res.json({
        success: true,
        message: "Message acknowledged",
      });
    } catch (error) {
      next(error);
    }
  }

  async getMessageLogs(req, res, next) {
    try {
      const logs = messageService.getMessageLogs(req.query);

      console.log("logs", logs);

      res.json({
        success: true,
        logs,
        total: logs.length,
      });
    } catch (error) {
      next(error);
      console.log("error in getMessageLogs", error);
    }
  }
}

module.exports = new MessageController();
