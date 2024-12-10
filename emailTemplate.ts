// emailTemplate.ts
export const emailTemplate = (studentName: string, level: string, story: string, translation: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      line-height: 1.8;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #fff;
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #055C9D;
    }
    p {
      font-size: 16px;
    }
    .story-section {
      margin-bottom: 20px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello ${studentName},</h1>
    <p>Here is your English learning story (${level}):</p>

    <div class="story-section">
      <h2>[ENGLISH VERSION]</h2>
      <p>${story}</p>
    </div>

    <div class="story-section">
      <h2>[PORTUGUESE VERSION]</h2>
      <p>${translation}</p>
    </div>

    <p>Enjoy your studies!</p>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} English Learning Program. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`;
