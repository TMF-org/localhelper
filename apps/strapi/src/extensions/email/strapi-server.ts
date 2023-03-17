import { mailTemplateService } from './templateService';

export default (plugin) => {
  plugin.services['template'] = mailTemplateService;
  return plugin;
};
