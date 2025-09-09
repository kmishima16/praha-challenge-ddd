# GitHub Copilot Instructions

このドキュメントは、AIコーディングエージェントがこのリポジトリで効率的に開発を進めるためのガイドです。

## 1. アーキテクチャ概要

このプロジェクトは、クリーンアーキテクチャ（オニオンアーキテクチャ）を採用しています。各レイヤーの責務は以下の通りです。

- **`src/domain`**: ビジネスロジックのコア。ドメインエンティティ、値オブジェクト、リポジトリのインターフェースを定義します。
  - **エンティティ**: `src/domain/assignment/assignment.ts` のように、不変条件をコンストラクタやメソッドで強制するクラスとして実装されます。新しいインスタンスは `create()` ファクトリメソッドで、DBからの再構築は `reconstruct()` ファクトリメソッドで生成します。IDには `ulid` を使用します。
- **`src/application`**: ユースケース層。ドメイン層を操作して具体的なアプリケーションのタスクを実現します。
  - 例: `src/application/use-case/create-assignment-use-case.ts`
- **`src/infrastructure`**: `domain` 層で定義されたインターフェース（主にリポジトリ）の実装。Drizzle ORM を用いて PostgreSQL と通信します。
  - 例: `src/infrastructure/repository/postgresql-assignment-repository.ts`
- **`src/presentation`**: アプリケーションのエントリーポイント。Hono フレームワークを使用し、HTTPリクエストを処理してユースケースを呼び出します。
  - 例: `src/presentation/assignment/create-assignment-controller.ts`

### データフローの例（課題作成）

1.  **Presentation**: Hono のコントローラがリクエストを受信し、Zod でバリデーションを行います。
2.  **Middleware**: ユースケースとリポジトリのインスタンスを生成します。
3.  **Application**: ユースケースがドメインエンティティを `create()` し、リポジトリの `save()` メソッドを呼び出します。
4.  **Infrastructure**: リポジトリが Drizzle ORM を使ってデータベースにデータを永続化します。
5.  **Presentation**: ユースケースから返された結果を JSON としてクライアントに返します。

## 2. 主要なライブラリとツール

- **Webフレームワーク**: [Hono](https://hono.dev/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **データベース**: PostgreSQL
- **バリデーション**: [Zod](https://zod.dev/)
- **テスト**: [Vitest](https://vitest.dev/)
- **リンター/フォーマッター**: [Biome](https://biomejs.dev/)
- **ビルドツール**: [Vite](https://vitejs.dev/) (`vite-node` を使用)
- **パッケージ管理**: `pnpm`

## 3. 開発ワークフロー

`README.md` にも記載されていますが、主要なコマンドは以下の通りです。

- **環境構築**:
  1.  `pnpm install`
  2.  `.env.example` を `.env` にコピーして設定
  3.  `docker compose up -d` でDBを起動
  4.  `pnpm run migration:apply` でマイグレーション実行
- **開発サーバー起動**: `pnpm run dev`
- **テスト実行**: `pnpm run test`
- **リンターとフォーマッター**: `pnpm run lint`
- **データベーススキーマの変更**:
  1.  `src/libs/drizzle/schema.ts` を編集します。
  2.  `pnpm run migration:generate` でマイグレーションファイルを生成します。
  3.  `pnpm run migration:apply` でDBに適用します。

## 4. コーディング規約とパターン

- **ドメイン駆動設計 (DDD)**: エンティティ、値オブジェクト、リポジトリといったDDDの基本パターンに従ってください。`README.md` に記載の通り、まだ完全な実装ではないため、あるべき姿を模索しながら実装を進めてください。
- **リポジトリパターン**: `domain` 層にインターフェース (`IAssignmentRepository`) を定義し、`infrastructure` 層でそれを実装 (`PostgresqlAssignmentRepository`) します。
- **ID生成**: エンティティのIDは `src/libs/ulid/index.ts` を利用して生成されるULIDです。
- **依存性注入 (DI)**: `presentation` 層のミドルウェアで、ユースケースに必要なリポジトリを注入するシンプルなDIが行われています。新しいコントローラを追加する際はこのパターンに従ってください。

## 5. 開発の進め方

1.  **実装計画の提示**: コーディングを始める前に、どのような実装を行うか、変更するファイルは何か、といった計画を提示してください。
2.  **承認と質問**: 提示した計画について、指示者から承認を得てください。もし実装に必要な情報が不足している場合は、この時点で質問し、要件を明確にしてください。
3.  **実装**: 承認が得られたら、計画に沿って実装を開始してください。
