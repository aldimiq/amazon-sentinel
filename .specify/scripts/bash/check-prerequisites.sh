#!/usr/bin/env bash
set -e

# Parse args
JSON_MODE=false
REQUIRE_TASKS=false
for arg in "$@"; do
    case "$arg" in
        --json) JSON_MODE=true ;;
        --require-tasks) REQUIRE_TASKS=true ;;
    esac
done

SCRIPT_DIR="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

eval $(get_feature_paths)

if [[ ! -d "$FEATURE_DIR" ]]; then
    echo "ERROR: Feature directory not found at $FEATURE_DIR" >&2
    exit 1
fi

if [[ ! -f "$FEATURE_SPEC" ]]; then
    echo "ERROR: spec.md missing." >&2
    exit 1
fi

if $REQUIRE_TASKS && [[ ! -f "$TASKS" ]]; then
    echo "ERROR: tasks.md missing." >&2
    exit 1
fi

# Build docs list
docs=()
[[ -f "$RESEARCH" ]] && docs+=("research.md")
[[ -f "$DATA_MODEL" ]] && docs+=("data-model.md")
[[ -f "$TASKS" ]] && docs+=("tasks.md")

if $JSON_MODE; then
    json_docs=$(printf '"%s",' "${docs[@]}")
    json_docs="[${json_docs%,}]"
    printf '{"FEATURE_DIR":"%s","AVAILABLE_DOCS":%s}\n' "$FEATURE_DIR" "$json_docs"
else
    echo "FEATURE_DIR: $FEATURE_DIR"
    echo "Docs found: ${docs[*]}"
fi
