const { DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../connection');
const { RequestRangeError } = require('../../server/errors');

class Contributor extends Model {
  static createOrUpdate(opts) {
    return Contributor.upsert(opts, { returning: true });
  }

  static async getSignedFromSubset(externalIDs, externalEmails) {
    const IDs = await Contributor.findAll({
      attributes: ['github_id'],
      where: {
        github_id: {
          [Op.in]: externalIDs,
        },
      },
    }).map(entry => entry.get('github_id'));

    const emails = await Contributor.findAll({
      attributes: ['email'],
      where: {
        email: {
          [Op.in]: externalEmails,
        },
      },
    }).map(entry => entry.get('email'));

    return [IDs, emails];
  }

  static getAllIndividual(opts) {
    const { limit = 1000, offset = 0 } = opts;

    if (limit > 10000) {
      throw new RequestRangeError('Limit of 10,000 exceeded.');
    }

    return Contributor.findAndCountAll({
      where: { is_corporation: false },
      attributes: [
        'first_name',
        'last_name',
        'email',
        'address',
        'github_name',
        'date_signed',
      ],
      order: [['last_name', 'ASC']],
      raw: true,
      limit,
      offset,
    });
  }

  static getAllCorporate(opts) {
    const { limit = 1000, offset = 0 } = opts;

    if (limit > 10000) {
      throw new RequestRangeError('Limit of 10,000 exceeded.');
    }

    return Contributor.findAndCountAll({
      where: { is_corporation: true },
      attributes: [
        'first_name',
        'last_name',
        'email',
        'corporation_name',
        'address',
        'github_name',
        'point_of_contact_first_name',
        'point_of_contact_last_name',
        'point_of_contact_email',
        'point_of_contact_title',
        'signee_first_name',
        'signee_last_name',
        'signee_title',
        'schedule_b',
        'date_signed',
      ],
      order: [['corporation_name', 'ASC']],
      raw: true,
      limit,
      offset,
    });
  }

  static removeUsers(githubUserNames) {
    Contributor.destroy({
      // https://sequelize.org/master/manual/model-querying-basics.html#examples-with--code-op-and--code--and--code-op-or--code-
      where: {
        github_name: {
          [Op.or]: githubUserNames,
        },
      },
    });
  }
}

Contributor.init(
  {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    github_id: DataTypes.INTEGER,
    github_name: DataTypes.STRING,
    address: DataTypes.STRING,
    corporation_name: DataTypes.STRING,
    point_of_contact_first_name: DataTypes.STRING,
    point_of_contact_last_name: DataTypes.STRING,
    point_of_contact_email: DataTypes.STRING,
    point_of_contact_title: DataTypes.STRING,
    signee_first_name: DataTypes.STRING,
    signee_last_name: DataTypes.STRING,
    signee_title: DataTypes.STRING,
    date_signed: DataTypes.DATE,
    is_corporation: DataTypes.BOOLEAN,
    schedule_b: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'contributor',
    underscored: true,
    timestamps: false,
    created_at: 'date_signed',
  },
);

module.exports = Contributor;
