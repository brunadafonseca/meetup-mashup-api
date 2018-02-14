# Meetup mashup

This is a simple project built during Codaisseur Academy in order to learn about websockets, using the [Meetup API](https://www.meetup.com/nl-NL/meetup_api/) and [socket.io](https://socket.io/)

![meetup](https://res.cloudinary.com/dyyxiefx5/image/upload/v1518634800/Screen_Shot_2018-02-14_at_7.55.18_PM_di2u0w.png)

### Project requirements:

+ Show a list of the top 10 topics from the category "Software Development"
+ Display real time RSVPS for "Software Development" events

```bash
git clone git@github.com:brunadafonseca/meetup-mashup-react.git
cd meetup-mashup-react
yarn install
yarn start
```

Then in a separate terminal tab:

```bash
git clone git@github.com:brunadafonseca/meetup-mashup-api.git
cd meetup-mashup-api
yarn install
node .
```
