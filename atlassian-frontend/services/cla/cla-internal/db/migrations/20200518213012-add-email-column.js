const logger = require('../../server/logger');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async t => {
        return queryInterface.addColumn(
          'pull_request',
          'emails',
          {
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          { transaction: t },
        );
      });
    } catch (e) {
      logger.error({
        type: 'db_migration',
        value: 'failed to add email column for pr table',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async t => {
        return queryInterface.removeColumn(
          'pull_request',
          'emails',
          {
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          { transaction: t },
        );
      });
    } catch (e) {
      logger.error({
        type: 'db_migration',
        value: 'failed to remove email column for pr table',
      });
    }
  },
};
