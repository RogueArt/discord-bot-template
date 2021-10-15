// Allow access to .env file
import dotenv from 'dotenv'
dotenv.config()

// Get keys from .env
const { BOT_TOKEN } = process.env

// Discord
import { Client, Intents } from 'discord.js'

// Initialize Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS]})

// Bring in commands, helper functions
import { extractCmdAndArgs, isValidMsg, logCmd } from './utils/lib'
import { hello, help } from './commands/index.js'

// Execute on start up
client.on('ready', () => {
  console.log('Bot name', 'bot started!')
})

// Execute on message creation
client.on('messageCreate', async msg => {
  // Validate message if needed
  if (!isValidMsg(msg)) {
    msg.channel.send({ content: 'Invalid message.' })
    return
  }

  // Store logs of commands by users
  logCmd(msg)

  // Get command name and arguments from the message
  const [cmd, args] = extractCmdAndArgs(msg) 

  // Call right function for command
  switch (cmd) {
    // Hello world command 
    case 'hello':
      await hello(msg, args)
      break

    case 'help':
      await help(msg, args)
      break
    
    // Default handler if command not understood
    default:
        break
  }
})

// Log the bot into Discord
client.login(BOT_TOKEN)