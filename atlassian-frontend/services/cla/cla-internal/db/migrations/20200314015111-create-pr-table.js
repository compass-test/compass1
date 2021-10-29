module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pull_request', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
      },
      repo_owner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      repo_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comment_id: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      commit_sha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      github_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      github_names: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    return queryInterface.addIndex('pull_request', ['github_ids'], {
      indicesType: 'UNIQUE',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('pull_request');
  },
};
