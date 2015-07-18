/**
* Statement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
connection: 'mysql',
  tableName: 'test1',
      migrate: 'safe',

  attributes: {
  title:{
  type:'string',
  required:true
  },
  description: {
  type:'string',
  required:true
  },
  date: {
  type:'datetime',
  required:true
  },
  author: {
  type:'string',
  required:true
  }
  
  }
};

