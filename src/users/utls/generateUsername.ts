function generateUsername(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const usernameLength = 8;
  let username = '';

  for (let i = 0; i < usernameLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters.charAt(randomIndex);
  }

  return username;
}

export default generateUsername;
