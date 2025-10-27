// Export all models for easy import
const User = require("./User");
const Project = require("./Project");
const ProjectMember = require("./ProjectMember");
const Task = require("./Task");
const TaskAssignment = require("./TaskAssignment");
const Message = require("./Message");
const MessageAttachment = require("./MessageAttachment");
const Notification = require("./Notification");
const AISuggestion = require("./AISuggestion");

module.exports = {
    User,
    Project,
    ProjectMember,
    Task,
    TaskAssignment,
    Message,
    MessageAttachment,
    Notification,
    AISuggestion,
};
