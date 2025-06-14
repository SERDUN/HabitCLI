function parseArgs(argv = process.argv.slice(2)) {
    const result = {_: []};

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];

        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true;
            result[key] = value;
            if (value !== true) i++;
        } else {
            result._.push(arg);
        }
    }

    return result;
}

export function getCommand(argv = process.argv.slice(2)) {
    const parsed = parseArgs(argv);
    return parsed._[0] || null;
}

export function getArguments(argv = process.argv.slice(2)) {
    const parsed = parseArgs(argv);
    const {_, ...args} = parsed;
    return args;
}
