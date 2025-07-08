# Rörstöd Kalkylator

En webbaserad kalkylator för att beräkna antal rörstöd för Ibeco-projekt.

## Funktioner

- Beräkna rörstöd baserat på rördimensioner
- Stöd för SDR-beräkningar
- Automatisk filtrering av optimala produkter
- Kopiera-funktion för enkel export till Excel
- Responsiv design

## Användning

### Input
- **Ytterrör**: Ange innerdiameter direkt ELLER ytterdiameter + SDR
- **Innerrör**: Ytterdiameter
- **Antal**: Ange antal ringar direkt ELLER längd + CC-mått

### Output
- Alla möjliga rörstöd-alternativ
- Optimala val markerade med ⭐
- Produkter med bäst centrering markerade med 🎯
- Kopiera-funktion för RSK-nummer och antal

## Installation

### Utveckling
```bash
npm install
npm start