# Security Policy - Claude Code Usage

## 🔒 EPAM Security Requirements for Claude Code

This document outlines mandatory security practices for using Claude Code in EPAM projects.

---

## Core Security Principles

### 1. Least Privilege
Grant Claude Code only the permissions needed for the current task. Review permission settings regularly.

### 2. Human in the Loop
✅ **Always require human approval** for:
- Write operations (commits, pushes, file modifications)
- Deployments and infrastructure changes
- Irreversible actions (deletes, force operations)

### 3. No Secrets in Context
❌ **NEVER share with Claude Code:**
- API keys, tokens, passwords, credentials
- Private keys or certificates
- PII (customer or employee data)
- EPAM proprietary or client confidential information
- Production database connection strings
- OAuth tokens or session keys

### 4. Audit Everything
Enable audit logging for Claude Code sessions in production-adjacent environments.

### 5. Sandbox First
Test Claude Code automation in dev environments before enabling in staging or production.

---

## Blocked Commands

The following destructive commands are **DENIED** by policy:

```bash
rm -rf                    # Recursive force deletion
git push --force          # Force push to remote
git push -f               # Force push (short form)
kubectl delete            # Kubernetes resource deletion
terraform destroy         # Infrastructure destruction
npm publish               # Package publishing
docker system prune       # Docker cleanup
docker rmi                # Docker image removal
```

---

## Credential Management

### ❌ WRONG - Hardcoded Secrets
```json
// DON'T DO THIS
{
  "env": {
    "API_KEY": "sk-proj-abc123xyz..."
  }
}
```

### ✅ CORRECT - Environment Variables
```json
// DO THIS
{
  "env": {
    "API_KEY": "${API_KEY}"
  }
}
```

### Secure Credential Storage
1. Store secrets in `.env` file (already in `.gitignore`)
2. Use environment variables: `${VARIABLE_NAME}`
3. Never commit `.env` to version control
4. Use secure credential management tools (e.g., HashiCorp Vault, Azure Key Vault)

---

## Permission Configuration

### Current Settings (`.claude/settings.local.json`)

**Auto-Approved (No Prompt):**
- `git status` - Check repository status
- `npm test` - Run tests
- `npm run lint` - Run linting
- GitHub read operations (list issues, search code)

**Require Approval (Prompt):**
- `git log`, `git diff`, `git show`
- `git add`, `git commit`, `git push`
- `git merge`, `git rebase`, `git reset`
- GitHub write operations (create PR, create issue, comment)

**Blocked (Denied):**
- Destructive commands listed above

---

## .claudeignore File

Prevents Claude Code from accessing sensitive files:

```
.env
.env.*
*.pem
*.key
secrets/
credentials/
node_modules/
.git/
dist/
build/
```

---

## Security Review Checklist

Before using Claude Code in this project:

- [x] `.claudeignore` exists with sensitive paths excluded
- [x] `settings.local.json` has blocked commands configured
- [x] No API keys or credentials in CLAUDE.md
- [x] No API keys or credentials in settings files
- [x] `.env` file is in `.gitignore`
- [x] Permission mode requires approval for write operations
- [ ] All AI-generated code reviewed before merge
- [ ] Developers completed Claude Code security training
- [ ] Audit logging enabled (if applicable)

---

## Common Anti-Patterns to Avoid

| ❌ Anti-Pattern | 🚨 Risk | ✅ Solution |
|----------------|---------|------------|
| Pasting `.env` into chat | Credential exposure in session logs | Reference env vars by name only |
| Allowing `git push` in permitted commands | Unreviewed code pushed to remote | Block git push, require manual push after review |
| Running Claude Code as root/admin | Unrestricted filesystem access | Run as least-privileged user |
| Skipping code review on AI code | Security vulnerabilities introduced | All AI code must pass standard review |
| Using `autoApprove: true` in shared envs | Uncontrolled automated changes | Always require approval in team environments |

---

## Incident Response

If you accidentally expose credentials:

1. **Immediately revoke** the exposed credential
   - OpenAI: https://platform.openai.com/api-keys
   - GitHub: https://github.com/settings/tokens
   - Other services: Contact service provider

2. **Rotate** to a new credential

3. **Report** to your team lead and security team

4. **Review** git history and session logs for exposure scope

---

## Compliance & Audit

- All Claude Code sessions must be reviewed for security compliance
- Generated code must pass standard EPAM code review process
- Report security concerns to your team lead immediately
- Follow EPAM's AI usage guidelines and policies
- Maintain audit trail of all Claude Code operations in production

---

## Questions or Concerns?

Contact:
- Your Team Lead
- EPAM Security Team
- AI Governance Team

---

**Last Updated:** 2026-03-22
**Policy Version:** 1.0
**Applies To:** All EPAM Claude Code Users
