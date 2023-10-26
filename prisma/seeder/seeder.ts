import { PrismaClient } from '@prisma/client';
import csv from 'csvtojson';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(12);

async function seedProvinsi() {
  const dataProvinsi = await csv().fromFile(__dirname + '/data/provinsi.csv');
  const provinsi = dataProvinsi.map(prov => {
    return {
      nama: prov.name,
      id: parseInt(prov.id),
    };
  });
  for (const prov of provinsi) {
    await prisma.provinsi.upsert({
      where: {
        id: prov.id,
      },
      update: prov,
      create: prov,
    });
  }
}

async function seedKabupaten() {
  const dataKabupaten = await csv().fromFile(
    __dirname + '/data/kabupatenkota.csv',
  );
  const kabupaten = dataKabupaten.map(kab => {
    return {
      nama: kab.nama,
      id: parseInt(kab.id),
      provinsiId: parseInt(kab.provinsiID),
    };
  });
  for (const kab of kabupaten) {
    await prisma.kabupaten.upsert({
      where: {
        id: kab.id,
      },
      update: kab,
      create: kab,
    });
  }
}

async function users() {
  const dataUser = await csv().fromFile(__dirname + '/data/users.csv');
  const users = dataUser.map(user => {
    return {
      nama: user.nama,
      email: user.email,
      password: bcrypt.hashSync(user.password, salt),
      role: user.role,
    };
  });

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: user,
      create: user,
    });
  }
}

const main = async () => {
  await seedProvinsi();
  await seedKabupaten();
  await users();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
