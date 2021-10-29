module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contributor', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      github_id: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      github_name: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      corporation_name: {
        type: Sequelize.STRING,
      },
      point_of_contact_first_name: {
        type: Sequelize.STRING,
      },
      point_of_contact_last_name: {
        type: Sequelize.STRING,
      },
      point_of_contact_email: {
        type: Sequelize.STRING,
      },
      point_of_contact_title: {
        type: Sequelize.STRING,
      },
      signee_first_name: {
        type: Sequelize.STRING,
      },
      signee_last_name: {
        type: Sequelize.STRING,
      },
      signee_title: {
        type: Sequelize.STRING,
      },
      date_signed: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      is_corporation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      schedule_b: {
        type: Sequelize.STRING,
      },
    });

    await queryInterface.addConstraint(
      'contributor',
      [
        'is_corporation',
        'corporation_name',
        'point_of_contact_first_name',
        'point_of_contact_last_name',
        'point_of_contact_email',
        'signee_first_name',
        'signee_last_name',
        'signee_title',
      ],
      {
        type: 'check',
        name:
          'Null check on applicable fields based on truthiness of is_corporation',
        where: {
          [Sequelize.Op.or]: [
            {
              [Sequelize.Op.and]: [
                { is_corporation: false },
                { corporation_name: { [Sequelize.Op.eq]: null } },
                { point_of_contact_first_name: { [Sequelize.Op.eq]: null } },
                { point_of_contact_last_name: { [Sequelize.Op.eq]: null } },
                { point_of_contact_email: { [Sequelize.Op.eq]: null } },
                { point_of_contact_title: { [Sequelize.Op.eq]: null } },
                { signee_title: { [Sequelize.Op.eq]: null } },
              ],
            },
            {
              [Sequelize.Op.and]: [
                { is_corporation: true },
                { corporation_name: { [Sequelize.Op.ne]: null } },
                { point_of_contact_first_name: { [Sequelize.Op.ne]: null } },
                { point_of_contact_last_name: { [Sequelize.Op.ne]: null } },
                { point_of_contact_email: { [Sequelize.Op.ne]: null } },
                { point_of_contact_title: { [Sequelize.Op.ne]: null } },
                { signee_first_name: { [Sequelize.Op.ne]: null } },
                { signee_last_name: { [Sequelize.Op.ne]: null } },
                { signee_title: { [Sequelize.Op.ne]: null } },
              ],
            },
          ],
        },
      },
    );

    await queryInterface.addIndex('contributor', ['corporation_name'], {
      indicesType: 'UNIQUE',
    });

    return queryInterface.addIndex('contributor', ['github_id'], {
      indicesType: 'UNIQUE',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('contributor');
  },
};
