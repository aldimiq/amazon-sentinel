#!/usr/bin/env bash
set -e

JSON_MODE=false
ARGS=()
for arg in "$@"; do
    case "$arg" in
        --json) JSON_MODE=true ;;
        *) ARGS+=("$arg") ;;
    esac
done

DESCRIPTION="${ARGS[*]}"
SCRIPT_DIR="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

REPO_ROOT=$(get_repo_root)
SPECS_DIR="$REPO_ROOT/specs"
mkdir -p "$SPECS_DIR"

# Calculate next number
highest=0
for dir in "$SPECS_DIR"/*; do
    if [[ -d "$dir" ]]; then
        dirname=$(basename "$dir")
        num=$(echo "$dirname" | grep -o '^[0-9]\\{3\\}' || echo "0")
        num=$((10#$num))
        if [ "$num" -gt "$highest" ]; then highest=$num; fi
    fi
done
NEXT_NUM=$(printf "%03d" $((highest + 1)))

# Generate slug
SLUG=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\\+/-/g' | cut -c 1-30 | sed 's/-$//')
BRANCH_NAME="${NEXT_NUM}-${SLUG}"
FEATURE_DIR="$SPECS_DIR/$BRANCH_NAME"

mkdir -p "$FEATURE_DIR"
cp "$REPO_ROOT/.specify/templates/spec-template.md" "$FEATURE_DIR/spec.md"

export SPECIFY_FEATURE="$BRANCH_NAME"

if $JSON_MODE; then
    printf '{"BRANCH_NAME":"%s","SPEC_FILE":"%s"}\n' "$BRANCH_NAME" "$FEATURE_DIR/spec.md"
else
    echo "Created feature: $BRANCH_NAME"
    echo "Spec file: $FEATURE_DIR/spec.md"
fi
