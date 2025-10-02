## ER図

https://dbdiagram.io/d/68c5dbb2841b2935a66d64a6

<img src="image-1.png" width="1000"/>

### users

- email_address: メールアドレス
- first_name: 名
- last_name: 性

### user_status

- name: 在籍中、休会中、退会済み、卒業など

### user_types

- name: admin, student, mentorなど

### user_tasks

ある生徒のtaskステータスに変更があれば、このテーブルにinsertする

- user_id: 外部キー
- challenge_id: 外部キー
- task_status_id: 外部キー

### task_status

- name: 未着手、着手中、レビュー待ち、完了など

### challenges

- name: 課題のタイトル
- content_url: 課題のリンク先

### challenge_categories

- name: データベース、SQL、フロントエンド、設計など

### teams

- name: a, b, cなど

### team_membership_histories

userがteamに加入した場合は新しいレコードをinsertし、teamから脱退する場合は該当するuser, teamのレコードのend_dateをupdateする。

- user_id: 外部キー
- team_id: 外部キー
- start_date: チーム加入日
- end_date: チーム脱退日（nullであればチーム在籍とみなす）