import { createAuthClient } from 'better-auth/client'
import {
  anonymousClient,
  magicLinkClient,
  emailOTPClient,
  passkeyClient,
  oneTapClient,
  adminClient,
  apiKeyClient,
  organizationClient,
  deviceAuthorizationClient,
  lastLoginMethodClient,
  multiSessionClient
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [
    anonymousClient(),
    magicLinkClient(),
    emailOTPClient(),
    passkeyClient(),
    oneTapClient({
      clientId: 'YOUR_CLIENT_ID',
      // Optional client configuration:
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {
        // Any extra options for the Google initialize method
      },
      // Configure prompt behavior and exponential backoff:
      promptOptions: {
        baseDelay: 1000, // Base delay in ms (default: 1000)
        maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
      },
    }),
    adminClient(),
    apiKeyClient(),
    organizationClient(),
    deviceAuthorizationClient(),
    lastLoginMethodClient(),
    multiSessionClient()
  ],
})
