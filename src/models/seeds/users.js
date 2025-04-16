const bcrypt = require('bcryptjs'); // Tambahkan ini di atas

exports.seed = async function(knex) {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('123456', 10); // Hash password baru

  await knex('users').insert([
    {
      id: 1,
      name: 'Juhaway',
      email: 'gugai.way@gmail.com',
      password: hashedPassword,
      role: 'super_admin',
      max_devices: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 2,
      name: 'Budi Prasetyo',
      email: 'budi@kontraktor.id',
      password: hashedPassword,
      role: 'user',
      max_devices: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 3,
      name: 'Siti Nurhaliza',
      email: 'siti@kontraktor.id',
      password: hashedPassword,
      role: 'user',
      max_devices: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
