# RAG Data Sources & Vector Store

This module implements a Retrieval-Augmented Generation (RAG) system for the NVIDIA Bot.

## Components

### Data Sources
- **FileSystem**: Scans local files (PDF, Docx, MD, TXT).
- **SQL**: Connects to SQL Databases.
  - `Connectors.MockSQLDataSource`: Demo connector with fake data.
  - `Connectors.PostgresDataSource`: Real PostgreSQL connector.
- **CMS**: Connects to Headless CMS (Mock implementation included).

### Vector Stores
- **SimpleVectorStore**: In-memory, keyword-based search (default, no setup required).
- **PineconeVectorStore**: Real vector database using Pinecone.

## Configuration

To enable Real connectors, set the following environment variables in your `.env` file:

### PostgreSQL
```env
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_user
PG_PASSWORD=your_password
PG_DB=your_db
```

### Pinecone
```env
PINECONE_API_KEY=your_api_key
PINECONE_INDEX=your_index_name
```

If these variables are present, the web server will automatically initialize the real connectors.
