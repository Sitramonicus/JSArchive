# Agent operating rules — execution discipline

These rules apply to future agent turns and handoffs.

## Bash and process discipline

1. **Prefer one bash call per logical operation.** Combine related reads, edits, and verification into one script when that is safe and readable. Do not run several independent bashes merely to inspect adjacent facts.
2. **Avoid parallel bashes unless they are genuinely independent and the time savings matter.** Parallel tool calls are acceptable for unrelated, read-only checks, but the default is one consolidated command.
3. **Use a hard 5–7 minute ceiling for bash work.** Do not launch a one-shot bash command expected to run longer than 420 seconds. Set its timeout accordingly.
4. **Use a managed background process for work that may be long-running.** Start it with `start_process`, wait for a port/log/exit condition, and stop it with `stop_process` if it reaches the 5–7 minute limit, stalls, or loses a clear progress signal.
5. **If a bash/process exceeds the ceiling, kill it rather than letting it run indefinitely.** Record the stop, elapsed-time reason, partial result, and a smaller replacement plan in the handoff.
6. **Do not rerun an unchanged long command after a timeout.** First reduce the scope, add progress checkpoints, or repair the suspected cause.

## Handoff requirements

- Record any timeout or killed process under the current action log.
- State whether a result is complete, partial, or unknown.
- Prefer one verification command that reports all relevant paths and exits nonzero on failure.
- Do not change frozen release bytes while repairing metadata, aliases, or documentation.
