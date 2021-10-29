const logger = require('../../server/logger');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async t => {
        await queryInterface.removeColumn('pull_request', 'id', {
          transaction: t,
        });

        await queryInterface.addColumn(
          'pull_request',
          'number',
          {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: false,
          },
          { transaction: t },
        );

        await queryInterface.changeColumn(
          'pull_request',
          'repo_owner',
          {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: false,
          },
          { transaction: t },
        );

        await queryInterface.changeColumn(
          'pull_request',
          'repo_name',
          {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: false,
          },
          { transaction: t },
        );

        await queryInterface.removeIndex('pull_request', ['github_ids'], {
          transaction: t,
        });
      });
    } catch (e) {
      logger.error({
        type: 'db_migration',
        value: 'failed to set composite key for pr table',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async t => {
        await queryInterface.addIndex('pull_request', ['github_ids'], {
          transaction: t,
        });

        await queryInterface.changeColumn(
          'pull_request',
          'repo_name',
          {
            type: Sequelize.STRING,
            primaryKey: false,
            allowNull: false,
          },
          {
            transaction: t,
          },
        );

        await queryInterface.changeColumn(
          'pull_request',
          'repo_owner',
          {
            type: Sequelize.STRING,
            primaryKey: false,
            allowNull: false,
          },
          {
            transaction: t,
          },
        );

        await queryInterface.removeColumn('pull_request', 'number', {
          transaction: t,
        });

        return queryInterface.addColumn(
          'pull_request',
          'id',
          {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
          },
          { transaction: t },
        );
      });
    } catch (e) {
      logger.error({
        type: 'db_migration',
        value: 'failed to revert composite key for pr table',
      });
    }
  },
};
