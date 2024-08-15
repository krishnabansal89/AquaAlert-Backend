const userModel = require('../models/user');
import { getAll } from './roomController';
import main from '../utils/groqAPI';
import room from '../models/room';
const userController = {
    async updateRoom(req, res, next) {
        const {time , flowRate, pressure} = req.body;
        const userId = req.user._id;
        const _rooms = await getAll(req, res, next);
        const data = {device: {time, flowRate, pressure}, _rooms};
        const groqResponse = await main(data);
        const response = JSON.parse(groqResponse.choices[0].message.content);
        let roomData = []
        for (const room in response) {
            roomData.push({roomName: room, probability: response[room]});
        }
        roomData = roomData.sort((a, b) => b.probability - a.probability);
        res.json(response);
        const eqpuipment = await room.findOne({userId: userId, roomName: roomData[0].roomName});
        eqpuipment.waterConsum += flowRate*10;
    }

}
export default userController;