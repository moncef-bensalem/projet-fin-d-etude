const formatted = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'TND',
}).format(amount); 