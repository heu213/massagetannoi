import loggerHelper from '@app/utils/logger.util';
import emailClient from '@core/email';
import fs from 'fs';
import handlebarsUtil from '@utils/handlebars.util';
import { endsWith, map } from 'lodash';
import path from 'path';

import { readDirRecursiveSync } from '@app/utils/app.util';
import Mail from 'nodemailer/lib/mailer';
import NotificationBotCollection from '@app/modules/notification-bot-manager/notification-bot-manager.collection';
const logger = loggerHelper.getLogger('email.service');

const templatesPath = `${__dirname}/templates`;
/*
 * Gets the body from a string (usually a template)
 */
const getTemplateAttributes = (str: string) => {
  let index = 0;
  const lines = str.split('\n');
  const attributes: any = {};
  let tokens;
  do {
    // eslint-disable-next-line no-plusplus
    tokens = lines[index++].match(/^([a-z]+):(.+)/i);
    if (tokens) {
      attributes[tokens[1].toLowerCase()] = tokens[2].replace(/<br( \/)?>/g, '\n').trim();
    }
    
  } while (tokens);
  
  attributes.body = lines.slice(index).join('\n').trim();
  attributes.subject = JSON.stringify(attributes.body).match(new RegExp("(?<=<title>)(.*?)(?=</title>)", 'gi'))[0];
  return attributes;
};

class EmailService {
  static instance: EmailService;

  templates: any = {};

  constructor() {
    this.init();
  }

  init() {
    const header = fs.readFileSync(`${templatesPath}/partials/header.hbs`, 'utf8');
    const footer = fs.readFileSync(`${templatesPath}/partials/footer.hbs`, 'utf8');

    handlebarsUtil.registerPartial('header', header);
    handlebarsUtil.registerPartial('footer', footer);
    const templatePaths = readDirRecursiveSync(templatesPath).filter(
      (fileName) => endsWith(fileName, 'hbs')
    );
    
    templatePaths.forEach((templatePath) => {
      const template = path.basename(templatePath).split(".").slice(0, -1).join(".");
      const templateKey = template;
      const source = fs.readFileSync(templatePath, 'utf8');
      this.templates[templateKey] = handlebarsUtil.compile(source);
    });
    
    
  }

  async sendNotificationEmail(data: {
    template?: string,
    recipients: string[],
    templateData: {[key: string]: any}, 
    attachments?: any
  }) {
    try {
      const {
        template, recipients, templateData, attachments,
      } = data || {};
      const htmlTemplate = this.templates[template](templateData);
      const attributes = getTemplateAttributes(htmlTemplate);
      return emailClient.sendEmailSMTP(
        recipients,
        attributes.subject,
        attributes.body,
        '',
        map(attachments, (att: any) => ({
          filename: att.filename,
          content: Buffer.from(att.content),
        })),
      );
     
      
    } catch (error) {
      logger.error('sending email', error);
      return Promise.reject(error);
    }
  }

  static getInstance() {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

}

export default EmailService.getInstance();
