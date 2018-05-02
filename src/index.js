const config = require('config')
const https = require('https')
const server = require('http').createServer()
const io = require('socket.io')(server, {})
const models = require('models')
const uniqid = require('uniqid')

clientsList = {
        "0": "Cu7ious",
        "1": "Florida",
        "2": "Reuben",
        "3": "Hyacinth",
        "4": "Edwin",
        "5": "Yasis",
        "6": "Rosita",
        "7": "Rich",
        "8": "Talitha",
        "9": "Kiara",
        "10": "Hilda",
        "11": "Shanelle",
        "12": "Minta",
        "13": "Lakendra",
        "14": "Melva",
        "15": "Maddie",
        "16": "Veta",
        "17": "Julian",
        "18": "Johnette",
        "19": "Tamra",
        "20": "Iluminada",
        "21": "Deena",
        "22": "Carmine",
        "23": "Ivana",
        "24": "Sid",
        "25": "Bronwyn",
        "26": "Taneka",
        "27": "Stephnie",
        "28": "Rickie",
        "29": "Samatha",
        "30": "Yesenia",
        "31": "Marth",
        "32": "Keely",
        "33": "Sheldon",
        "34": "Jeana",
        "35": "Fonda",
        "36": "Chun",
        "37": "Goldie",
        "38": "Royal",
        "39": "Kimberlee",
        "40": "Gail",
        "41": "Jin",
        "42": "Toshia",
        "43": "Thi",
        "44": "Adah",
        "45": "Digna",
        "46": "Curtis",
        "47": "Ariane",
        "48": "Mallie",
        "49": "Chris",
        "50": "Annalee"
}

const { PORT } = config

let counter = 0;

io.on('connection', socket => {

        socket.join('CanBoard')
        let who = counter === 0 ? clientsList[0] : clientsList[counter]
        counter = (counter > 50) ? 0 : ++counter

        socket.emit('connected', who);
        socket.broadcast.emit("someoneConnected", who)

  console.log('New client connected', `ID: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('Client disconnected', `ID: ${socket.id}`)
  })

  // let clients = io.sockets.clients();
  // console.log(clients);

  socket.on('getProjects', () => {
        models.project.find({})
                .then(res => {
                        if (!res.length) {
                                // console.log('getProjects');
                                socket.emit("noProjects")
                                socket.broadcast.emit("noProjects")
                        } else {
                                socket.emit('fetchClientData', res)
                                socket.broadcast.emit('fetchClientData', res)
                        }
                })
                .catch(e => {
                console.log(e)
        })
  })

  socket.on('switchProjects', () => {
        models.project.find({})
                .then(res => {
                        if (!res.length) {
                                console.log('getProjects');
                                socket.emit("noProjects")
                        } else {
                                socket.emit('fetchClientData', res)
                                socket.broadcast.emit('colaboratorHasChangedProj')
                        }
                })
                .catch(e => {
                console.log(e)
        })
  })

  socket.on('createProject', payload => {
          if (payload) {
                  const project = new models.project({id: uniqid(), name: payload.text})
                  project.save(() => {
                          models.project.find({})
                                  .then(res => {
                                          if (!res.length) {
                                                  console.log('getProjects');
                                                  socket.emit("noProjects")
                                                  socket.broadcast.emit("noProjects")
                                          } else {
                                                  socket.emit('fetchClientData', res)
                                                  socket.broadcast.emit('fetchClientData', res)
                                          }
                                  })
                                  .catch(e => {
                                  console.log(e)
                          })
                  })
          }
  })

  socket.on('createTask', payload => {
          if (payload) {
                models.project.find({id: payload.project_id})
                  .then(res => {
                          if (res.length)
                          {
                                  let boards = res[0].boards
                                  let board = boards[payload.board_id]
                                  board.push({id: payload.task.id, text: payload.task.text})
                                  boards[payload.board_id] = board

                                  models.project.update({ _id: res[0]._id }, { $set: {boards: boards} }, (err) => {
                                        models.project.findById({_id: res[0]._id})
                                        .then(newRes => {
                                                // console.log(newRes);
                                                socket.emit('fetchClientData', [newRes])
                                                socket.broadcast.emit('fetchClientData', [newRes])
                                        })
                                        .catch(e => {
                                                console.log(e)
                                        })
                                  })
                          }
                  })
                  .catch(e => {
                    console.log(e)
                  })
          } else {
                  console.error("Payload is empty")
          }
  })

  socket.on('removeTask', payload => {
          if (payload) {
                models.project.find({id: payload.project_id})
                  .then(res => {
                          if (res.length)
                          {
                                  let boards = res[0].boards
                                  let board = boards[payload.board_id]
                                  board = board.filter(el => (
                                        el.id !== payload.task_id
                                  ))

                                  boards[payload.board_id] = board

                                  models.project.update({ _id: res[0]._id }, { $set: {boards: boards} }, (err) => {
                                        models.project.findById({_id: res[0]._id})
                                        .then(newRes => {
                                                // console.log(newRes);
                                                socket.emit('fetchClientData', [newRes])
                                                socket.broadcast.emit('fetchClientData', [newRes])
                                        })
                                        .catch(e => {
                                                console.log(e)
                                        })
                                  })
                          }
                  })
                  .catch(e => {
                    console.log(e)
                  })
          } else {
                  console.error("Payload is empty")
          }
  })

})

server.listen(PORT)
