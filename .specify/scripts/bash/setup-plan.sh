#!/usr/bin/env bash
set -e
JSON_MODE=false
for arg in "$@"; do if [[ "$arg" == "--json" ]]; then JSON_MODE=true; fi; done

SCRIPT_DIR="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"
eval $(get_feature_paths)

if [[ ! -f "$IMPL_PLAN" ]]; then
    cp "$REPO_ROOT/.specify/templates/plan-template.md" "$IMPL_PLAN"
fi

if $JSON_MODE; then
    printf '{"IMPL_PLAN":"%s"}\n' "$IMPL_PLAN"
else
    echo "Plan ready at: $IMPL_PLAN"
fi

