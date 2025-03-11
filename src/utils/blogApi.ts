import { blogPosts as fallbackPosts } from '../data/blogPosts';

// Using the free NewsAPI for health and fitness articles
const API_KEY = '8e8154ca890e4737b935a3b6f1c3bcd9';

export async function fetchHealthArticles() {
  if (import.meta.env.DEV) {
    console.log('Development mode: Using fallback blog posts');
    return fallbackPosts;
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=fitness+health+workout&sortBy=publishedAt&apiKey=${API_KEY}&pageSize=3`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      excerpt: article.description,
      image: article.urlToImage || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000',
      date: new Date(article.publishedAt).toLocaleDateString(),
      author: article.author || 'Health & Fitness Expert',
      category: 'Fitness'
    }));
  } catch (error) {
    console.log('Using fallback blog posts due to API error');
    return fallbackPosts;
  }
}