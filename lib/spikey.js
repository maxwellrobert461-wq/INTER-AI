export const API_KEYS = {
  GROQ: process.env.GROQ_API_KEY || '',
  BLOB_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || '',
  PAYSTACK_PUBLIC: process.env.NEXT_PUBLIC_PAYSTACK_KEY || '',
  PAYSTACK_SECRET: process.env.PAYSTACK_SECRET_KEY || '',
  RESEND_API: process.env.RESEND_API_KEY || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
}
export function checkKeys(){ return {ok:true} }