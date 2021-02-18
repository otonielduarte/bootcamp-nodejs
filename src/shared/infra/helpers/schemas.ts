const schemas = {
  id: {
    name: 'id',
    type: 'uuid',
  },
  id_generated: {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    generationStrategy: 'uuid',
    default: 'uuid_generate_v4()',
  },
  name: {
    type: 'varchar',
  },
  email: {
    type: 'varchar',
    isNullable: false,
    isUnique: true,
  },
  date: {
    type: 'timestamp with time zone',
  },
  date_now: {
    type: 'timestamp',
    default: 'now()',
  },
};

const constraints = {
  cascade: {
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
};

const teste = {
  name: 'id',
  type: 'uuid',
  isPrimary: true,
  generationStrategy: 'uuid',
  default: 'uuid_generate_v4()',
};

export { schemas, constraints, teste };
