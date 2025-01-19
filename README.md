# Community Page Application

This project is a frontend-only community page application built using React, TypeScript and Sass CSS compiler. The application allows users to create and remove posts, comment on posts, and manage nested comments with editing and deletion capabilities. It also includes features to reply to comments dynamically, emulating popular social media platforms.

## Features

### Post Management

- Create new posts.
- Edit existing posts.
- Delete posts, which also removes all associated comments, nested comments

### Comment Management

- Add comments to posts.
- Edit and delete comments.
- Nested comments: users can reply to comments, creating a threaded discussion.
- Dynamic reply box appears upon clicking the "Reply" button for a comment.

### Nested Comment Structure

- Unlimited levels of nested comments.
- Seamless UI for managing parent-child comment relationships.## Technologies Used

## Technologies Used

### Frameworks and Libraries

- **React**: Component-based UI development.
- **TypeScript**: Statically typed JavaScript for type safety and enhanced developer experience.

### Styling

- **SCSS (CSS Modules)**: Modular and reusable styles for improved maintainability.

### State Management

- React's `useContext` hook for managing component-level state.

## Getting Started with locally Project Setup

### Prerequisites

- Node.js (v22 or higher recommended)
- yarn
- [Sass](https://sass-lang.com/) compiler must be need to installed the local machine/PC to run the project for CSS modules

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahbubhasanhira/community-page.git
   ```
2. Navigate to the project directory:
   ```bash
   cd community-page
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   yarn start
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure
```
project/
├── public/
│   └── index.html                        # HTML template
├── src/
│   ├── components/
│   │   ├── Comments/
│   │   │   ├── CommentEditForm.tsx       # Form for editing comments
│   │   │   ├── CommentReplyForm.tsx      # Form for replying to comments
│   │   │   ├── Comments.tsx              # Component for displaying comments
│   │   │   └── NewCommentForm.tsx        # Form for creating new comments
│   │   ├── Common/
│   │   │   └── Avatar.tsx                # Common component for displaying user avatars
│   │   ├── Posts/
│   │   │   ├── Accordion.tsx             # Accordion component for collapsible sections
│   │   │   ├── CreatePost.tsx            # Component for creating a new post
│   │   │   ├── Feed.tsx                  # Component to display a feed of posts
│   │   │   └── PostCard.tsx              # Component to display an individual post card
│   ├── Context/
│   │   └── PostContext.tsx               # Context provider for managing post-related state
│   ├── styles/
│   │   ├── accordion.module.scss         # Styles for the Accordion component
│   │   ├── comments.module.scss          # Styles for the Comments component
│   │   ├── createPost.module.scss        # Styles for the CreatePost component
│   │   ├── feed.module.scss              # Styles for the Feed component
│   │   ├── index.scss                    # Global styles for the project
│   │   └── postCard.module.scss          # Styles for the PostCard component
│   ├── Utilities/
│   │   ├── helperFunctions.ts            # Helper functions for common operations
│   │   ├── mockPosts.ts                  # Mock data for testing posts
│   │   └── types.ts                      # Type definitions for TypeScript
│   ├── App.tsx                           # Root component for the React application
│   └── index.tsx                         # Entry point for rendering the React app
├── .gitignore                            # Specifies files to be ignored by Git
├── declaration.d.ts                      # Type declaration file for TypeScript
├── package.json                          # Project dependencies and scripts
├── README.md                             # Documentation for the project
├── tsconfig.json                         # TypeScript configuration
└── yarn.lock                             # Lockfile for Yarn dependencies
```

## Usage

### Adding a Post

1. Enter content in the "Whats in your Mind?" text area.
2. Click the "Share" button to create a new post.

### Managing Posts

- **Edit**: Click the "Edit" button on a post, modify the content, a window popup will open, enter your updated text and click Ok.
- **Delete**: Click the "Delete" button to remove the post and all its comments.

### Adding Comments

1. Click the "Add a comment" input field below a post or comment.
2. Enter your comment and click the "Comment" button.

### Managing Comments

- **Reply**: Click the "Reply" button on a comment to display a reply input field.
- **Edit**: Click the "Edit" button to modify the comment content.
- **Delete**: Click the "Delete" button to remove the comment and its nested replies.

## Customization

### SCSS Styling

Modify the styles in `styles` folder to customize the appearance of the application.

### Initial Data

The initial posts and comments are defined in the `mockPosts.ts` under the `utilities` folder. You can modify this data to suit your requirements.
