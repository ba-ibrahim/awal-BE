const { default: axios } = require("axios")

const Meeting = require("../models/Meeting")

// exports.createMeeting = async (req, res) => {
//     // required params 1: check
//     // 2: create payload params
//     // 3: 

//     // learnie-bra/api/v1/create_meeting

//     const { title, description } = req.body

//     const baseUrl = 'https://zoomapi/'
//     const endpoint = '/meetings'

//     const responce = await axios.post(baseUrl, {
//         headers: {
//             'Authorization': `Bearer ${zoomToken}`,
//             'Content-Type': 'application/json'
//         },
//         data: payload
//     })

//     const {id, assistant_id, join_url} = responce.data

//     // save meeting details to database
//     const meeting = await Meeting.create({
//         title: title,
//         description: description,
//         zoomId: id,
//         zoomAssistantId: assistant_id,
//         joinUrl: join_url
//     })

//     const meeting_webhook = async (req, res) => {
//         // event_id , event_name 


//     }

    
// }