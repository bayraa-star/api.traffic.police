const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db'); // Adjust path to your db config

class ParkingEvent extends Model {}

ParkingEvent.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plate_chars: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_queue: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  full_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  segment_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  plate_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type_vehicle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plate_found: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  ocr_found: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  event_proc_time: {
    type: DataTypes.INTEGER, // Assuming milliseconds
    allowNull: true,
  },
  coord: {
    type: DataTypes.STRING, // Or JSONB if coordinates are structured
    allowNull: true,
  },
  speed: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING, // Or JSONB if size data is structured
    allowNull: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type_event: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modify: {
    type: DataTypes.DATE, // Assuming modification timestamp
    allowNull: true,
  },
  host_id: {
    type: DataTypes.INTEGER, // Or UUID if needed
    allowNull: true,
  },
  manager_id: {
    type: DataTypes.INTEGER, // Or UUID
    allowNull: true,
  },
  speed_id_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  speed_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rtsp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  vehicleinfo_id: {
    type: DataTypes.INTEGER, // Or UUID
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  antenna_num: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  epc_num: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rfid_id: {
    type: DataTypes.STRING, // Or INTEGER
    allowNull: true,
  },
  rssi_level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tid_num: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ParkingEvent',
  tableName: 'parking_event',
  timestamps: false, // No automatic timestamps, based on existing table
});

module.exports = ParkingEvent;