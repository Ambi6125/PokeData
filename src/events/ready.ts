import { event, Events } from '../utils/index'

export default event(Events.ClientReady, ({log}, client) => { 
    return log(`\nLogged in as ${client.user.username}.`);
 } )