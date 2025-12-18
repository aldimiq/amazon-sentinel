#!/usr/bin/env bash
# Common functions and variables for Amazon Sentinel scripts

get_repo_root() {
    if git rev-parse --show-toplevel >/dev/null 2>&1; then
        git rev-parse --show-toplevel
    else
        # Fallback for non-git environments
        local script_dir="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
        (cd "$script_dir/../../.." && pwd)
    fi
}

get_current_branch() {
    if [[ -n "${SPECIFY_FEATURE:-}" ]]; then
        echo "$SPECIFY_FEATURE"
        return
    fi
    if git rev-parse --abbrev-ref HEAD >/dev/null 2>&1; then
        git rev-parse --abbrev-ref HEAD
        return
    fi
    echo "main"
}

get_feature_paths() {
    local repo_root=$(get_repo_root)
    local current_branch=$(get_current_branch)
    local feature_dir="$repo_root/specs/$current_branch"
    
    # Check for numeric prefix match if exact match fails
    if [[ ! -d "$feature_dir" && "$current_branch" =~ ^[0-9]{3}- ]]; then
        # It's already in the right format
        :
    elif [[ ! -d "$feature_dir" ]]; then
        # Try to find a matching dir in specs/
        local match=$(find "$repo_root/specs" -maxdepth 1 -type d -name "*$current_branch" | head -n 1)
        if [[ -n "$match" ]]; then
            feature_dir="$match"
        fi
    fi

    cat <<EOF
REPO_ROOT='$repo_root'
CURRENT_BRANCH='$current_branch'
FEATURE_DIR='$feature_dir'
FEATURE_SPEC='$feature_dir/spec.md'
IMPL_PLAN='$feature_dir/plan.md'
TASKS='$feature_dir/tasks.md'
RESEARCH='$feature_dir/research.md'
DATA_MODEL='$feature_dir/data-model.md'
EOF
}
