# Aadil Ali Portfolio

A responsive portfolio for Aadil Ali, a Software Engineering student and full-stack web developer.

## Sections

1. About Me
2. Career Objective
3. Education
4. Technical Skills
5. Featured Projects
6. Featured Project Case Study
7. Experience and Internship
8. Certifications and Achievements
9. Contact

The page includes mobile navigation, keyboard-friendly controls, certificate lightbox previews, CV view/download links, and a contact form that opens the user's email application.

## Technology

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

## Folder Structure

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── ADIL ALI CV.pdf
│   └── images/
└── README.md
```

## Run Locally

Open the `portfolio` folder in Visual Studio Code and use Live Server. Alternatively, start a local server from the `portfolio` folder:

```powershell
python -m http.server 5500
```

Then open the local server address on port `5500` in your browser.

## Deploy

### Netlify

1. Create a new Netlify project.
2. Deploy the `portfolio` folder or connect this project repository.
3. Set the publish directory to `portfolio` if deploying the parent folder.

### Vercel

1. Import the project repository in Vercel.
2. Set the root directory to `portfolio`.
3. Use the other static-site settings without a build command.
