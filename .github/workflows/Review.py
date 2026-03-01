import os, json, urllib.request, sys

api_key = os.environ["GEMINI_API_KEY"]
gh_token = os.environ["GH_TOKEN"]
pr_number = os.environ.get("PR_NUMBER", "")
repo = os.environ["REPO"]

with open("diff.txt") as f:
    diff = f.read(30000)

if not diff.strip():
    print("No changes to review.")
    sys.exit(0)

prompt = (
    "Sen bir senior yazılım mühendisisin. "
    "Aşağıdaki kod değişikliklerini incele ve Türkçe detaylı bir code review yap.\n\n"
    "Şunlara dikkat et:\n"
    "1. Potansiyel bug'lar ve hatalar\n"
    "2. Performans sorunları\n"
    "3. Güvenlik açıkları\n"
    "4. Kod kalitesi ve okunabilirlik\n"
    "5. Best practice'lere uygunluk\n\n"
    "Markdown formatında yaz. Eğer her şey yolundaysa bunu da belirt.\n\n"
    "Kod değişiklikleri:\n" + diff
)

gemini_url = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/gemini-1.5-flash:generateContent?key=" + api_key
)

gemini_payload = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}]
}).encode()

print("Gemini'ye istek atiliyor...")
req = urllib.request.Request(
    gemini_url,
    data=gemini_payload,
    headers={"Content-Type": "application/json"}
)

try:
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read())
except urllib.error.HTTPError as e:
    print("Gemini API hatasi:", e.code, e.reason)
    print(e.read().decode())
    sys.exit(1)

review = data["candidates"][0]["content"]["parts"][0]["text"]
comment_body = "## Gemini Code Review\n\n" + review

print("Review alindi, PR'a yorum ekleniyor...")

gh_url = "https://api.github.com/repos/" + repo + "/issues/" + pr_number + "/comments"
gh_payload = json.dumps({"body": comment_body}).encode()

req = urllib.request.Request(
    gh_url,
    data=gh_payload,
    headers={
        "Authorization": "token " + gh_token,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json"
    }
)

try:
    with urllib.request.urlopen(req) as res:
        result = json.loads(res.read())
        print("Yorum eklendi:", result.get("html_url"))
except urllib.error.HTTPError as e:
    print("GitHub API hatasi:", e.code, e.reason)
    print(e.read().decode())
    sys.exit(1)
