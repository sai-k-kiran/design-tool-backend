'use strict';
const User = require('../models/User')

      module.exports = {
        up: (queryInterface, Sequelize) => {
              queryInterface.bulkInsert('Users', [{
              name: 'Demo User',
              email: 'demo@demo.com',
              password: '12demo21omed87',
              company: 'Demo Inc.',
              address: 'Copenhagen, Denmark',
              phone: '+45 98 00 00',
              createdAt: new Date(),
              updatedAt: new Date()
            }]);

          down: (queryInterface, Sequelize) => {
            return queryInterface.bulkDelete('Users', null, {});
            }
      }
    }   
