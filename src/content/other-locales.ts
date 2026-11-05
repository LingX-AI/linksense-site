import type { Messages } from './messages'

export const es: Messages = {
  agentTitle: 'Instalar con un agente',
  agentBody:
    'Copia este mensaje en tu agente de programación. Incluye el despliegue y la plataforma elegidos, las comprobaciones y la guía oficial.',
  agentCopy: 'Copiar instrucciones',
  manualTitle: 'Instalación manual',
  agentPrompt:
    'Instala LinkSense {{edition}} en esta máquina {{platform}} siguiendo {{docs}}. Comprueba el entorno antes de ejecutar el instalador. Conserva los datos y las credenciales existentes. Indica la URL y guíame en la configuración inicial sin mostrar secretos.',
  installGuide: 'Abrir guía de instalación',
  home: 'Inicio',
  install: 'Instalación',
  docs: 'Documentación',
  try: 'Explorar LinkSense',
  menu: 'Menú',
  close: 'Cerrar',
  language: 'Idioma',
  skip: 'Ir al contenido',
  category: 'Un espacio de trabajo con IA para tu organización',
  hero1: 'De una idea individual.',
  hero2: 'A una capacidad de todo el equipo.',
  heroBody:
    'Trabaja con IA. Conserva lo que funciona. Dale a tu equipo conocimientos, habilidades y herramientas para repetirlo.',
  heroNote: 'Código abierto. En tu infraestructura.',
  watch: 'Descubre LinkSense en acción',
  play: 'Reproducir demostración',
  pause: 'Pausar demostración',
  mute: 'Silenciar',
  unmute: 'Activar sonido',
  fullscreen: 'Pantalla completa',
  exitFullscreen: 'Salir de pantalla completa',
  seek: 'Progreso del vídeo',
  scenesTitle: 'Hazlo parte de\ntu día de trabajo.',
  sample: 'Ejemplo de flujo de trabajo',
  input: 'Tu petición',
  materials: 'Materiales de trabajo',
  report: 'Listo para revisar',
  source: 'Ver fuente',
  policy: 'Política de compras',
  answer: 'Una respuesta que puedes verificar.',
  sharedApp: 'Aplicación del equipo',
  skill: 'Habilidad',
  knowledge: 'Conocimiento',
  tools: 'Herramientas',
  people: 'Tu equipo',
  weekly: 'Informe semanal',
  scheduled: 'Programado',
  connectTitle: 'Conecta con el trabajo\ndonde ya está.',
  connectBody:
    'Autoriza Google Docs, Gmail, Outlook, OneDrive y SharePoint. Amplía tu espacio mediante MCP.',
  channelBody:
    'Inicia tareas desde WeChat, Feishu, WeCom, DingTalk y Microsoft Teams. Consulta el proceso completo y los archivos en LinkSense.',
  ownTitle: 'Tu infraestructura.\nTu forma de trabajar.',
  ownBody:
    'Despliega en tus servidores o nube privada. Elige modelos y gestiona quién puede utilizar cada capacidad.',
  models: 'Elige tus proveedores de modelos',
  governance: 'Usuarios, grupos y controles de acceso',
  usage: 'Cuotas, consumo y auditoría con datos sensibles ocultos',
  open: 'Una capa abierta de capacidades organizativas',
  faqTitle: 'Respuestas para empezar.',
  faq1: '¿En qué se diferencian Core y Full?',
  faq1a:
    'Core incluye el espacio de trabajo con IA y las capacidades organizativas, también los archivos adjuntos de las tareas. Full añade procesamiento documental y búsqueda en bases de conocimiento. Ambos son despliegues propios.',
  faq2: '¿Puedo usar mis propios modelos?',
  faq2a:
    'Puedes configurar proveedores y servicios compatibles. Antes de usarlos debes configurar modelos, credenciales y capacidades opcionales. La inferencia y la infraestructura pueden tener costes.',
  faq3: '¿El despliegue propio funciona totalmente sin conexión?',
  faq3a:
    'Depende de la configuración. Los modelos externos, sitios web, conectores y servicios MCP pueden transmitir datos fuera de tu infraestructura. El despliegue privado no garantiza aislamiento sin conexión.',
  faq4: '¿Qué exige la licencia de código abierto?',
  faq4a:
    'LinkSense utiliza CPAL-1.0 con permisos adicionales para despliegues internos. Las interfaces gráficas conservan la atribución; los documentos e imágenes exportados no necesitan marca de agua. Consulta los términos exactos.',
  ctaTitle: 'Pon las ideas de\ntu equipo a trabajar.',
  ctaBody: 'Empieza con una tarea real. Conserva lo que funciona.',
  footer: 'El trabajo con IA, conectado.',
  license: 'Licencia y atribución',
  security: 'Seguridad',
  community: 'Comunidad',
  installTitle: 'Abre espacio a\notra forma de trabajar.',
  installBody:
    'Elige un despliegue, prepara Docker y ejecuta el instalador. Después conecta un modelo y completa tu primera tarea.',
  edition: 'Despliegue',
  platform: 'Sistema operativo',
  coreBody: 'Espacio de trabajo con IA y capacidades organizativas.',
  fullBody:
    'Todo Core, más procesamiento documental y búsqueda de conocimiento.',
  requirements: 'Prepara el entorno',
  resourceNote:
    'Requisitos iniciales documentados, sin garantía de concurrencia o velocidad.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl y el puerto TCP 18081 disponible. macOS requiere Docker Desktop; cuenta la memoria realmente disponible para Docker Engine.',
  copy: 'Copiar comando',
  copied: 'Copiado',
  copyFailed:
    'No se puede copiar automáticamente. Selecciona el comando y cópialo manualmente.',
  afterInstall: 'Después de instalar',
  afterInstallBody:
    'Abre {{address}} y utiliza la credencial de inicialización de un solo uso que muestra el instalador para crear el primer administrador.',
  macNote:
    'En macOS, no uses sudo. Asigna memoria adicional a Docker Desktop para cumplir el requisito de memoria útil. La dirección localhost no significa acceso exclusivo desde tu Mac.',
  publicNote:
    'Para un despliegue público, configura un proxy inverso HTTPS. Protege las credenciales.',
  manage: 'Mantén tu despliegue operativo',
  upgradeNote:
    'La actualización crea una copia de PostgreSQL antes de migrar. Una vez iniciada la migración, los fallos no revierten automáticamente la base de datos. Guarda copias independientes de archivos y configuración.',
  fullNote:
    'La búsqueda de conocimiento requiere un modelo Embedding; Ranker es opcional.',
  notFound: 'Esta página no está aquí.',
  error: 'No se ha podido cargar esta página.',
  retry: 'Reintentar',
}

export const pt: Messages = {
  agentTitle: 'Instalar com um agente',
  agentBody:
    'Envie este pedido ao seu agente de programação. Ele inclui a implantação e a plataforma escolhidas, verificações e o guia oficial.',
  agentCopy: 'Copiar instruções',
  manualTitle: 'Instalação manual',
  agentPrompt:
    'Instale o LinkSense {{edition}} nesta máquina {{platform}} seguindo {{docs}}. Verifique o ambiente antes de executar o instalador. Preserve os dados e as credenciais existentes. Informe a URL e oriente a configuração inicial sem expor segredos.',
  installGuide: 'Abrir guia de instalação',
  home: 'Início',
  install: 'Instalação',
  docs: 'Documentação',
  try: 'Explorar o LinkSense',
  menu: 'Menu',
  close: 'Fechar',
  language: 'Idioma',
  skip: 'Ir para o conteúdo',
  category: 'Um ambiente de IA para sua organização',
  hero1: 'Da ideia de uma pessoa.',
  hero2: 'À capacidade de toda a equipe.',
  heroBody:
    'Trabalhe com IA. Preserve o que funciona. Dê à equipe conhecimento, habilidades e ferramentas para repetir os resultados.',
  heroNote: 'Código aberto. Na sua infraestrutura.',
  watch: 'Veja o LinkSense em ação',
  play: 'Reproduzir demonstração',
  pause: 'Pausar demonstração',
  mute: 'Silenciar',
  unmute: 'Ativar som',
  fullscreen: 'Tela cheia',
  exitFullscreen: 'Sair da tela cheia',
  seek: 'Progresso do vídeo',
  scenesTitle: 'Faça parte do\nseu dia de trabalho.',
  sample: 'Fluxo de trabalho ilustrativo',
  input: 'Seu pedido',
  materials: 'Materiais de trabalho',
  report: 'Pronto para revisão',
  source: 'Ver fonte',
  policy: 'Política de compras',
  answer: 'Uma resposta que você pode verificar.',
  sharedApp: 'Aplicativo da equipe',
  skill: 'Habilidade',
  knowledge: 'Conhecimento',
  tools: 'Ferramentas',
  people: 'Sua equipe',
  weekly: 'Resumo semanal',
  scheduled: 'Agendado',
  connectTitle: 'Encontre seu trabalho\nonde ele já está.',
  connectBody:
    'Autorize Google Docs, Gmail, Outlook, OneDrive e SharePoint. Amplie seu ambiente com MCP.',
  channelBody:
    'Inicie tarefas pelo WeChat, Feishu, WeCom, DingTalk e Microsoft Teams. Veja o processo completo e os arquivos no LinkSense.',
  ownTitle: 'Sua infraestrutura.\nSeu jeito de trabalhar.',
  ownBody:
    'Implante em seus servidores ou nuvem privada. Escolha modelos e gerencie quem pode usar cada capacidade.',
  models: 'Escolha os provedores de modelos',
  governance: 'Usuários, grupos e controle de acesso',
  usage: 'Cotas, uso e auditoria com dados sensíveis ocultos',
  open: 'Uma camada aberta de capacidades organizacionais',
  faqTitle: 'Algumas respostas para começar.',
  faq1: 'Qual é a diferença entre Core e Full?',
  faq1a:
    'Core inclui o ambiente de IA e as capacidades organizacionais, além dos anexos comuns das tarefas. Full acrescenta processamento de documentos e busca em bases de conhecimento. Ambos são opções de implantação própria.',
  faq2: 'Posso usar meus próprios modelos?',
  faq2a:
    'Você configura os provedores e serviços compatíveis. Antes do uso, configure modelos, credenciais e capacidades opcionais. Inferência e infraestrutura podem ter custos próprios.',
  faq3: 'A implantação própria funciona totalmente offline?',
  faq3a:
    'Depende da configuração. Modelos externos, sites, conectores e serviços MCP podem transmitir dados para fora da sua infraestrutura. Implantação privada não garante isolamento offline completo.',
  faq4: 'O que a licença de código aberto exige?',
  faq4a:
    'O LinkSense usa CPAL-1.0 com permissões adicionais para implantação interna. Interfaces gráficas mantêm a atribuição; documentos e imagens exportados não precisam de marca-d’água. Consulte os termos completos.',
  ctaTitle: 'Coloque as ideias\nda equipe em prática.',
  ctaBody: 'Comece com uma tarefa real. Aproveite o que funciona.',
  footer: 'Trabalho com IA, conectado.',
  license: 'Licença e atribuição',
  security: 'Segurança',
  community: 'Comunidade',
  installTitle: 'Abra espaço para\num novo jeito de trabalhar.',
  installBody:
    'Escolha a implantação, prepare o Docker e execute o instalador. Depois conecte um modelo e conclua sua primeira tarefa.',
  edition: 'Implantação',
  platform: 'Sistema operacional',
  coreBody: 'Ambiente de IA e capacidades organizacionais.',
  fullBody: 'Tudo do Core, mais documentos e busca de conhecimento.',
  requirements: 'Prepare o ambiente',
  resourceNote:
    'Requisitos iniciais documentados, sem garantia de concorrência ou velocidade.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl e porta TCP 18081 disponível. macOS requer Docker Desktop; vale a memória realmente disponível para o Docker Engine.',
  copy: 'Copiar comando',
  copied: 'Copiado',
  copyFailed:
    'Não foi possível copiar automaticamente. Selecione o comando e copie manualmente.',
  afterInstall: 'Depois da instalação',
  afterInstallBody:
    'Abra {{address}} e use a credencial de inicialização de uso único exibida pelo instalador para criar o primeiro administrador.',
  macNote:
    'No macOS, não use sudo. Aloque memória extra ao Docker Desktop para atender ao requisito de memória útil. O endereço localhost não significa acesso restrito ao seu Mac.',
  publicNote:
    'Para implantação pública, configure um proxy reverso HTTPS. Proteja as credenciais.',
  manage: 'Mantenha a implantação funcionando',
  upgradeNote:
    'A atualização cria um backup do PostgreSQL antes da migração. Após o início da migração, falhas não revertem o banco automaticamente. Mantenha backups independentes de arquivos e configuração.',
  fullNote:
    'A busca de conhecimento requer um modelo Embedding; Ranker é opcional.',
  notFound: 'Esta página não está aqui.',
  error: 'Não foi possível carregar esta página.',
  retry: 'Tentar novamente',
}

export const fr: Messages = {
  agentTitle: 'Installer avec un agent',
  agentBody:
    'Transmettez ce message à votre agent de programmation. Il comprend le déploiement choisi, la plateforme, les vérifications et le guide officiel.',
  agentCopy: 'Copier les instructions',
  manualTitle: 'Installation manuelle',
  agentPrompt:
    'Installe LinkSense {{edition}} sur cette machine {{platform}} en suivant {{docs}}. Vérifie l’environnement avant de lancer le programme d’installation. Préserve les données et les identifiants existants. Indique l’URL et guide-moi dans la configuration initiale sans révéler de secrets.',
  installGuide: 'Ouvrir le guide d’installation',
  home: 'Accueil',
  install: 'Installation',
  docs: 'Documentation',
  try: 'Découvrir LinkSense',
  menu: 'Menu',
  close: 'Fermer',
  language: 'Langue',
  skip: 'Aller au contenu',
  category: 'Un espace de travail IA pour votre organisation',
  hero1: 'De l’idée d’une personne.',
  hero2: 'Au savoir-faire de toute une équipe.',
  heroBody:
    'Travaillez avec l’IA. Conservez ce qui fonctionne. Donnez à votre équipe les connaissances, compétences et outils pour recommencer.',
  heroNote: 'Open source. Sur votre infrastructure.',
  watch: 'Voir LinkSense à l’œuvre',
  play: 'Lire la démonstration',
  pause: 'Mettre la démonstration en pause',
  mute: 'Couper le son',
  unmute: 'Activer le son',
  fullscreen: 'Plein écran',
  exitFullscreen: 'Quitter le plein écran',
  seek: 'Progression de la vidéo',
  scenesTitle: 'Une place dans\nvotre quotidien.',
  sample: 'Exemple de flux de travail',
  input: 'Votre demande',
  materials: 'Documents de travail',
  report: 'Prêt pour relecture',
  source: 'Voir la source',
  policy: 'Politique d’achat',
  answer: 'Une réponse dont on peut retrouver la source.',
  sharedApp: 'Application d’équipe',
  skill: 'Compétence',
  knowledge: 'Connaissances',
  tools: 'Outils',
  people: 'Votre équipe',
  weekly: 'Synthèse hebdomadaire',
  scheduled: 'Planifié',
  connectTitle: 'Retrouvez votre travail\nlà où il se trouve.',
  connectBody:
    'Autorisez Google Docs, Gmail, Outlook, OneDrive et SharePoint. Étendez votre espace avec MCP.',
  channelBody:
    'Lancez des tâches depuis WeChat, Feishu, WeCom, DingTalk et Microsoft Teams. Consultez le processus et les fichiers complets dans LinkSense.',
  ownTitle: 'Votre infrastructure.\nVotre façon de travailler.',
  ownBody:
    'Déployez sur vos serveurs ou votre cloud privé. Choisissez les modèles et gérez l’accès à chaque capacité.',
  models: 'Choisissez vos fournisseurs de modèles',
  governance: 'Utilisateurs, groupes et contrôle d’accès',
  usage: 'Quotas, consommation et audit expurgé',
  open: 'Une couche ouverte de capacités organisationnelles',
  faqTitle: 'Quelques réponses utiles.',
  faq1: 'Quelle différence entre Core et Full ?',
  faq1a:
    'Core comprend l’espace IA, les capacités organisationnelles et les pièces jointes ordinaires des tâches. Full ajoute le traitement documentaire et la recherche dans les connaissances. Les deux sont des options auto-hébergées.',
  faq2: 'Puis-je utiliser mes propres modèles ?',
  faq2a:
    'Vous configurez les fournisseurs et services compatibles. Modèles, identifiants et capacités facultatives doivent être configurés avant utilisation. L’inférence et l’infrastructure peuvent avoir leurs propres coûts.',
  faq3: 'L’auto-hébergement garantit-il un fonctionnement hors ligne ?',
  faq3a:
    'Cela dépend de la configuration. Modèles externes, sites web, connecteurs et services MCP peuvent transmettre des données hors de votre infrastructure. Un déploiement privé ne garantit pas un isolement hors ligne complet.',
  faq4: 'Qu’exige la licence open source ?',
  faq4a:
    'LinkSense utilise CPAL-1.0 avec des permissions supplémentaires pour les déploiements internes. Les interfaces graphiques conservent l’attribution ; les documents et images exportés ne nécessitent aucun filigrane. Consultez les conditions précises.',
  ctaTitle: 'Mettez les idées\nde l’équipe à l’œuvre.',
  ctaBody: 'Commencez par une vraie tâche. Conservez ce qui fonctionne.',
  footer: 'Le travail avec l’IA, connecté.',
  license: 'Licence et attribution',
  security: 'Sécurité',
  community: 'Communauté',
  installTitle: 'Faites place à\nune nouvelle façon de travailler.',
  installBody:
    'Choisissez un déploiement, préparez Docker et lancez l’installateur. Connectez ensuite un modèle et réalisez votre première tâche.',
  edition: 'Déploiement',
  platform: 'Système d’exploitation',
  coreBody: 'Espace de travail IA et capacités organisationnelles.',
  fullBody:
    'Tout Core, plus traitement documentaire et recherche de connaissances.',
  requirements: 'Préparez votre environnement',
  resourceNote:
    'Configuration de départ documentée, sans garantie de capacité simultanée ni de vitesse.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl et port TCP 18081 disponible. macOS nécessite Docker Desktop ; la mémoire retenue est celle réellement utilisable par Docker Engine.',
  copy: 'Copier la commande',
  copied: 'Copié',
  copyFailed:
    'Copie automatique indisponible. Sélectionnez la commande pour la copier manuellement.',
  afterInstall: 'Après l’installation',
  afterInstallBody:
    'Ouvrez {{address}} et utilisez l’identifiant d’initialisation à usage unique affiché par l’installateur pour créer le premier administrateur.',
  macNote:
    'Sous macOS, n’utilisez pas sudo. Allouez davantage de mémoire à Docker Desktop pour atteindre le minimum réellement utilisable. L’adresse localhost ne signifie pas que seul votre Mac peut accéder au service.',
  publicNote:
    'Pour un déploiement public, configurez un proxy inverse HTTPS. Protégez les identifiants.',
  manage: 'Maintenez votre déploiement',
  upgradeNote:
    'La mise à niveau sauvegarde PostgreSQL avant la migration. Après le début de la migration, une erreur ne rétablit pas automatiquement la base. Sauvegardez séparément fichiers et configuration.',
  fullNote:
    'La recherche nécessite un modèle Embedding ; Ranker est facultatif.',
  notFound: 'Cette page n’est pas ici.',
  error: 'Impossible de charger cette page.',
  retry: 'Réessayer',
}

export const ja: Messages = {
  agentTitle: 'AI エージェントでインストール',
  agentBody:
    'この手順をコーディングエージェントに渡してください。選択した構成と OS、環境の確認項目、公式ガイドを含みます。',
  agentCopy: 'インストール手順をコピー',
  manualTitle: '手動インストール',
  agentPrompt:
    '{{docs}} に従って、この {{platform}} マシンに LinkSense {{edition}} をインストールしてください。実行前に環境を確認し、既存のデータと認証情報を保全してください。完了後はアクセス URL と初期設定の手順を案内し、秘密情報は表示しないでください。',
  installGuide: 'インストールガイドを開く',
  home: 'ホーム',
  install: 'インストール',
  docs: 'ドキュメント',
  try: 'LinkSense を試す',
  menu: 'メニュー',
  close: '閉じる',
  language: '言語',
  skip: '本文へ移動',
  category: '組織のための AI ワークスペース',
  hero1: '一人のアイデアを、',
  hero2: 'チーム全体の力に。',
  heroBody:
    'AI と仕事を進め、役立つ方法を残す。知識、スキル、ツールをチーム全体で再利用できます。',
  heroNote: 'オープンソース。自分たちのインフラで。',
  watch: 'LinkSense の動作を見る',
  play: '製品デモを再生',
  pause: '製品デモを一時停止',
  mute: 'ミュート',
  unmute: '音声をオン',
  fullscreen: '全画面表示',
  exitFullscreen: '全画面表示を終了',
  seek: '動画の再生位置',
  scenesTitle: '日々の仕事に、\nAI の力を。',
  sample: 'ワークフローの例',
  input: '仕事の依頼',
  materials: '作業資料',
  report: 'レビュー待ちの成果物',
  source: '引用元を見る',
  policy: '購買管理規程',
  answer: '根拠を確認できる回答。',
  sharedApp: 'チームアプリ',
  skill: 'スキル',
  knowledge: '知識',
  tools: 'ツール',
  people: 'チーム',
  weekly: '週間レポート',
  scheduled: '実行予定',
  connectTitle: 'いつもの業務システムと、\nつながる。',
  connectBody:
    '認可した Google Docs、Gmail、Outlook、OneDrive、SharePoint を利用できます。MCP でほかの組織システムにも接続できます。',
  channelBody:
    'WeChat、Feishu、WeCom、DingTalk、Microsoft Teams からタスクを開始。詳しい実行内容とファイルは LinkSense で確認できます。',
  ownTitle: '自社の環境で、\n自社らしい働き方を。',
  ownBody:
    '自社サーバーやプライベートクラウドに導入。モデルを選び、機能を使えるユーザーを管理できます。',
  models: 'モデルと提供元を選択',
  governance: 'ユーザー、グループ、アクセス制御',
  usage: '利用枠、使用量、機密情報を除いた監査',
  open: 'オープンな組織向け機能基盤',
  faqTitle: 'まず知っておきたいこと。',
  faq1: 'Core と Full の違いは？',
  faq1a:
    'Core は AI ワークスペースと組織向け機能を備え、通常の添付ファイルも処理できます。Full は文書処理とナレッジ検索を追加します。どちらもセルフホストの構成です。',
  faq2: '自社で選んだモデルを使えますか？',
  faq2a:
    'モデルの提供元や互換エンドポイントを設定できます。利用前にモデル、認証情報、必要な機能の設定が必要です。推論やインフラには別途費用がかかる場合があります。',
  faq3: 'セルフホストなら完全オフラインですか？',
  faq3a:
    'データの送信先は設定によって異なります。外部モデル、ウェブサイト、コネクター、MCP サービスは外部にデータを送る場合があります。プライベート環境への導入は完全なオフライン分離を保証しません。',
  faq4: 'オープンソースの利用条件は？',
  faq4a:
    'LinkSense は CPAL-1.0 を採用し、社内導入向けの追加許諾を設けています。グラフィカルな画面では帰属表示が必要ですが、書き出した文書や画像に透かしは不要です。詳しくはライセンスをご確認ください。',
  ctaTitle: 'チームのアイデアを、\n仕事にしよう。',
  ctaBody: 'まずは一つの実際の仕事から。役立つ手順を蓄積しましょう。',
  footer: 'AI と組織の仕事をつなぐ。',
  license: 'ライセンスと帰属表示',
  security: 'セキュリティ',
  community: 'コミュニティ',
  installTitle: '新しい働き方の、\n場所をつくる。',
  installBody:
    '構成を選び、Docker を準備してインストーラーを実行します。その後モデルを接続し、最初のタスクを試しましょう。',
  edition: '構成',
  platform: 'OS',
  coreBody: 'AI ワークスペースと組織向け機能。',
  fullBody: 'Core の全機能と、文書処理・ナレッジ検索。',
  requirements: '動作環境を準備',
  resourceNote:
    '文書記載の初期要件です。同時実行数や処理速度を保証するものではありません。',
  dockerNote:
    'Docker Engine API 1.45+、Compose 2.24.4+、curl、空いている TCP 18081 ポートが必要です。macOS では Docker Desktop を使用し、Docker Engine が実際に利用できるメモリ量で判定します。',
  copy: 'コマンドをコピー',
  copied: 'コピーしました',
  copyFailed:
    '自動コピーできません。コマンドを選択して手動でコピーしてください。',
  afterInstall: 'インストール後',
  afterInstallBody:
    '{{address}} を開き、インストーラーが表示した一度限りの初期化認証情報で最初の管理者を作成します。',
  macNote:
    'macOS では sudo を使用しないでください。Docker Desktop に実用可能なメモリ要件を満たす余裕を持たせてください。localhost からのアクセス例は、Mac 以外からの接続を制限するものではありません。',
  publicNote:
    '公開環境では HTTPS リバースプロキシを設定し、認証情報を保護してください。',
  manage: '導入環境を運用する',
  upgradeNote:
    '更新時は移行前に PostgreSQL をバックアップします。移行開始後の失敗でデータベースが自動復元されることはありません。ファイルと設定は別途バックアップしてください。',
  fullNote: 'ナレッジ検索には Embedding モデルが必要です。Ranker は任意です。',
  notFound: 'このページは見つかりません。',
  error: 'ページを読み込めませんでした。',
  retry: '再試行',
}
