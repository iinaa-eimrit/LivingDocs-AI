from github import Github
import os

class PRManager:
    def __init__(self, token=None):
        self.token = token or os.getenv("GITHUB_TOKEN")
        self.gh = Github(self.token)

    def create_pr(self, repo_name, branch, file_path, content, pr_title, pr_body, bot_email="livingdocs-bot@users.noreply.github.com"):
        repo = self.gh.get_repo(repo_name)
        main_branch = repo.default_branch
        # Create new branch
        sb = repo.get_branch(main_branch)
        ref = f"refs/heads/{branch}"
        repo.create_git_ref(ref, sb.commit.sha)
        # Update file with bot commit filtering
        file = repo.get_contents(file_path, ref=main_branch)
        repo.update_file(
            file.path,
            pr_title,
            content,
            file.sha,
            branch=branch,
            committer={"name": "LivingDocs Bot", "email": bot_email},
            author={"name": "LivingDocs Bot", "email": bot_email}
        )
        # Create PR
        pr = repo.create_pull(title=pr_title, body=pr_body, head=branch, base=main_branch)
        return pr.html_url

# Example usage:
# manager = PRManager(token="<your_token>")
# pr_url = manager.create_pr("owner/repo", "docs-update-20260207", "README.md", "new content", "Update docs", "Automated doc update")
# print(pr_url)
