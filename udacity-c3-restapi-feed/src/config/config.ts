export const config = {
  "dev": {
    "username": process.env.UD_DB_USER,
    "password": process.env.UD_DB_PASSWORD,
    "database": process.env.UD_DB_DB,
    "host": process.env.UD_DB_HOST,
    "dialect": "postgres",
    "aws_reigion": process.env.UD_AWS_REGION,
    "aws_profile": process.env.UD_AWS_PROFILE,
    "aws_media_bucket": process.env.UD_AWS_MEDIA_BUCKET,
    "url": process.env.UD_URL
  },
  "prod": {
    "username": process.env.UD_DB_USER,
    "password": process.env.UD_DB_PASSWORD,
    "database": process.env.UD_DB_DB,
    "host": process.env.UD_DB_HOST,
    "dialect": "postgres"
  },
  "jwt": {
    "secret": process.env.API_SECRET
  }

}