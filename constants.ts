
import type { Email } from './types';

export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    recipient: 'scratch.rk',
    subject: '[scratch-ui] PR #123 merged: "feat: Add smart reply"',
    body: `
Hello Scratch Team,

The pull request "feat: Add smart reply" (#123) has been successfully merged into the main branch.

This feature introduces AI-powered reply suggestions to improve user productivity. Thanks to everyone who contributed to the review.

You can view the changes here: https://github.com/scratch-ui/pull/123

Best,
The GitHub Team
`,
    timestamp: '10:42 AM',
    read: false,
    starred: true,
  },
  {
    id: '2',
    sender: 'Vercel',
    senderEmail: 'noreply@vercel.com',
    recipient: 'scratch.rk',
    subject: 'Deployment Successful: scratch-mail-prod',
    body: `
Hi there,

We're happy to inform you that your latest deployment for the project "scratch-mail-prod" was successful.

Your application is now live and running on the latest version. You can visit it at your custom domain scratch.rk.

Keep up the great work!

Cheers,
The Vercel Team
`,
    timestamp: '9:15 AM',
    read: true,
    starred: false,
  },
  {
    id: '3',
    sender: 'Alice Johnson',
    senderEmail: 'alice.j@example.com',
    recipient: 'scratch.rk',
    subject: 'Project Update & Next Steps',
    body: `
Hey,

Just wanted to give you a quick update on the Q3 project. We've hit all our milestones for this month, and the client is very pleased with the progress.

For next week, can you please focus on integrating the new analytics dashboard? Let's sync up on Monday to discuss the technical details.

Thanks,
Alice
`,
    timestamp: 'Yesterday',
    read: false,
    starred: false,
  },
  {
    id: '4',
    sender: 'Figma',
    senderEmail: 'team@figma.com',
    recipient: 'scratch.rk',
    subject: 'New comments on "Email Client Mockups"',
    body: `
Someone left new comments on your design file.

Bob commented: "Love the clean layout! What do you think about making the compose button float?"
Charlie mentioned you: "@scratch.rk Can you provide the SVG assets for the icons?"

Open in Figma to reply.

Happy designing,
The Figma Team
`,
    timestamp: 'Yesterday',
    read: true,
    starred: true,
  },
  {
    id: '5',
    sender: 'Bob Smith',
    senderEmail: 'bob.smith@example.com',
    recipient: 'scratch.rk',
    subject: 'Lunch on Friday?',
    body: `
Hey,

Are you free to grab lunch this Friday? I was thinking of that new cafe downtown around 1 PM. Let me know if that works for you!

Best,
Bob
`,
    timestamp: '2 days ago',
    read: true,
    starred: false,
  },
  {
    id: '6',
    sender: 'Tailwind Labs',
    senderEmail: 'newsletter@tailwind.com',
    recipient: 'scratch.rk',
    subject: 'What’s new in Tailwind CSS v3.4',
    body: `
Tailwind CSS v3.4 is here — with dynamic viewport units, :has() support, balanced headlines, subgrid, and more.

This release is packed with new features that make it possible to build even more ambitious designs, directly in your HTML.

Read the full announcement on our blog.
`,
    timestamp: '3 days ago',
    read: true,
    starred: false,
  },
];
