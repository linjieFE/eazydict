'use strict';

const debug = require('../lib/debug');
const co = require('co');
const sequelize = require('sequelize');
const HistoryModel = require('./model/HistoryModel');
const WordBookModel = require('./model/WordBookModel');

/**
 * 取累计查询的单词数
 */
function getHistoryCount() {
  return co(function* () {
    let historyModel = yield new HistoryModel();

    let data = yield historyModel.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'num']
      ]
    });

    return data.dataValues.num;
  }).catch(err => {
    debug(err);
    return '未知';
  });
}

/**
 * 取累计查询次数
 */
function getLookupCount() {
  return co(function* () {
    let historyModel = yield new HistoryModel();

    let data = yield historyModel.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('count')), 'num']
      ]
    });

    return data.dataValues.num;
  }).catch(err => {
    debug(err);
    return '未知';
  });
}

/**
 * 取生词数
 */
function getWordBookCount() {
  return co(function* () {
    let wordBookModel = yield new WordBookModel();

    let data = yield wordBookModel.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'num']
      ]
    });

    return data.dataValues.num;
  }).catch(err => {
    debug(err);
    return '未知';
  });
}

module.exports = {
  getHistoryCount,
  getLookupCount,
  getWordBookCount
};
