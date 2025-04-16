const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Hapus data settings sebelumnya (jika ada)
  await knex('settings').del();

  // Hash nilai "5" untuk max_user
  const hashedMaxUser = await bcrypt.hash('5', 10);  // 5 adalah nilai yang ingin di-hash

  await knex('settings').insert([
    {
      key: 'max_user',
      value: hashedMaxUser,  // Ini adalah hasil hash dari "5"
      is_encrypted: true,     // Tandai bahwa ini adalah data terenkripsi
    },
    {
      key: 'email_provider',
      value: 'google',
      is_encrypted: false,
    },
    {
      key: 'allow_custom_email',
      value: 'true',
      is_encrypted: false,
    },
    {
      key: 'company_name',
      value: 'PT Karya Bersama',
      is_encrypted: false,
    },
    {
      key: 'email_recipients_default',
      value: JSON.stringify(['admin@karyabersama.co.id']),
      is_encrypted: false,
    }
  ]);
};
