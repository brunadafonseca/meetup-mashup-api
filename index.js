var app = require('express')()
var server = require('http').Server(app)

server.listen(3002)

var io = require('socket.io')(server)
var Meetup = require('meetup')
var mup = new Meetup()

let topicsCounter = {}
let topics = []

mup.stream('/2/rsvps', stream => {
  stream
    .on('data', item => {
      const topicNames = item.group.group_topics.map(topic => topic.topic_name)
      if (topicNames.includes('Software Development')) {
        topicNames.forEach(name => {
          // io.emit('action', {newEvent: name })
          if (topicsCounter[name]) {
            topicsCounter[name]++
          }
          else {
            topicsCounter[name] = 1
          }
        })

        const arrayOfTopics = Object.keys(topicsCounter)

        arrayOfTopics.sort((a, b) => {
          if (topicsCounter[a] > topicsCounter[b]) {
            return -1
          } else if (topicsCounter[b] > topicsCounter[a]) {
              return 1
          } else {
            return 0
          }
        })

        topics = arrayOfTopics.slice(0, 10).map(topicNames => {
          return { topic: topicNames, count: topicsCounter[topicNames] }
        })

        console.log("Got 10 first geek topics: ")
        console.log(topics)
        console.log(item)

        io.emit('action', { type: 'UPDATE_TOPICS', payload: topics })
        io.emit('action', { type: 'ADD_RSVP', payload: item })
      }
    }).on("error", e => {
      console.log("error! " + e)
    })
})

io.on('connection', socket => {
  socket.emit('action', { type: 'UPDATE_TOPICS', payload: topics })
})
