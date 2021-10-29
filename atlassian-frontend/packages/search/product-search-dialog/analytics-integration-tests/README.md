Every test starts with

    const { findByText, getFiredEvents, transitionToPostQuery } = await  setup

await setup returns two debug utilities:

    debug , debugEvents

invoking `debug()` in your test will print the whole HTML on the console.
`debugEvents` will show what all events were triggered.
