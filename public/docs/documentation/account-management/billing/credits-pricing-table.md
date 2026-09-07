> ## Documentation Index
> Fetch the complete documentation index at: https://www.voiceflow.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Credits pricing table

> How credits are consumed across your agent's LLM, voice, and orchestration usage.

export const CreditsPricingTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const CATEGORY_LABELS = {
    orchestration: 'Orchestration',
    llm: 'Large Language Models (LLMs)',
    asr: 'Speech-to-Text (STT)',
    tts: 'Text-to-Speech (TTS)'
  };
  const VENDOR_NAMES = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    google: 'Google',
    groq: 'Groq',
    deepgram: 'Deepgram',
    rimelabs: 'Rime Labs',
    cartesia: 'Cartesia',
    elevenlabs: 'ElevenLabs',
    assemblyai: 'AssemblyAI'
  };
  const normalizeVendor = vendor => {
    if (!vendor) return '';
    const key = vendor.toLowerCase().replace(/[\s-]/g, '');
    return VENDOR_NAMES[key] || vendor;
  };
  const getItemName = (item, vendor, category) => {
    if (category === 'orchestration') {
      const names = {
        interaction: 'Chat usage',
        audio: 'Voice usage',
        'no-reply': 'No-reply usage'
      };
      return names[item] || item;
    }
    if (category === 'asr') return `${normalizeVendor(vendor)} - STT`;
    if (category === 'tts') {
      const v = normalizeVendor(vendor);
      if (v === 'ElevenLabs') {
        const lower = item?.toLowerCase() || '';
        if (lower.includes('flash')) return 'ElevenLabs - TTS - Flash';
        if (lower.includes('turbo')) return 'ElevenLabs - TTS - Turbo';
        if (lower.includes('multilingual')) return 'ElevenLabs - TTS - Multilingual';
        return 'ElevenLabs - TTS';
      }
      return `${v} - TTS`;
    }
    return item;
  };
  const formatUnit = unit => {
    if (!unit) return '';
    const lower = unit.toLowerCase();
    if (lower.includes('per 1000 input tokens')) return '1K Input Tokens';
    if (lower.includes('per 1000 output tokens')) return '1K Output Tokens';
    if (lower.includes('credits per 1000 llm tokens')) return '1K Tokens';
    if (lower.includes('credits per 1000 characters')) return '1K Characters';
    if (lower.includes('credits per minute')) return 'Minutes';
    return unit;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://realtime-api.voiceflow.com/v1alpha1/estimation/config');
        if (!response.ok) throw new Error('Failed to fetch pricing data');
        const json = await response.json();
        const grouped = {};
        for (const item of json.config.usage) {
          const io = item.category === 'llm-input' ? 'input' : item.category === 'llm-output' ? 'output' : undefined;
          const category = item.category?.startsWith('llm') ? 'llm' : item.category;
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push({
            ...item,
            io
          });
        }
        setData(grouped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Loading pricing data...</p>;
  if (error) return <p style={{
    color: 'red'
  }}>Error: {error}</p>;
  if (!data) return null;
  const orchestrationItems = {
    interaction: data.orchestration?.find(i => i.item === 'interaction'),
    noReply: data.orchestration?.find(i => i.item === 'no-reply'),
    audio: data.orchestration?.find(i => i.item === 'audio')
  };
  const processLLMData = items => {
    if (!items) return [];
    const map = {};
    for (const item of items) {
      const key = `${item.vendor}||${item.item}`;
      if (!map[key]) map[key] = {
        vendor: item.vendor,
        item: item.item,
        input: null,
        output: null
      };
      if (item.io === 'input') map[key].input = item;
      if (item.io === 'output') map[key].output = item;
    }
    return Object.values(map).sort((a, b) => normalizeVendor(a.vendor).localeCompare(normalizeVendor(b.vendor)) || a.item.localeCompare(b.item));
  };
  const processData = (items, category) => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const vendorCompare = normalizeVendor(a.vendor).localeCompare(normalizeVendor(b.vendor));
      if (vendorCompare !== 0) return vendorCompare;
      return getItemName(a.item, a.vendor, category).localeCompare(getItemName(b.item, b.vendor, category));
    });
  };
  const formatNumber = value => {
    if (value == null) return '';
    const rounded = Math.round(Number(value) * 1000000) / 1000000;
    return String(rounded);
  };
  const formatDisplayValue = (value, pricingMode) => {
    if (value == null) return '';
    if (pricingMode === 'enterprise') return value;
    const converted = Number(value) / 200;
    return `$${formatNumber(converted)}`;
  };
  const formatCredits = (value, priorityValue, pricingMode) => {
    if (value == null) return '';
    if (priorityValue != null) {
      return <>
          {formatDisplayValue(value, pricingMode)}
          <br />
          <span style={{
        color: '#888',
        fontSize: '0.85em'
      }}>
            {formatDisplayValue(priorityValue, pricingMode)} with priority
          </span>
        </>;
    }
    return formatDisplayValue(value, pricingMode);
  };
  return <>
      <Tabs>
        <Tab title="Self-serve pricing">
          <>
            <h2>{CATEGORY_LABELS.orchestration}</h2>
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Item</th>
                  <th>Unit</th>
                  <th>Credits per unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RelVoca</td>
                  <td>Chat usage</td>
                  <td>Every time a user sends a message, or a request is sent to the Conversations API (excluding launch events).</td>
                  <td>{formatCredits(orchestrationItems.interaction?.value ?? 1, orchestrationItems.interaction?.priorityValue, 'selfServe')}</td>
                </tr>
                <tr>
                  <td>RelVoca</td>
                  <td>No-reply usage</td>
                  <td>Every time a message is sent by the no-reply feature. While no-reply messages are not charged for, if generative no-reply features are used, you will be charged credits for LLM usage.</td>
                  <td>{formatDisplayValue(0, 'selfServe')}</td>
                </tr>
                <tr>
                  <td>RelVoca</td>
                  <td>Phone usage</td>
                  <td>Minutes on phone calls</td>
                  <td>{formatCredits(orchestrationItems.audio?.value ?? 10, orchestrationItems.audio?.priorityValue, 'selfServe')}</td>
                </tr>
              </tbody>
            </table>

            {data.llm && data.llm.length > 0 && <>
                <h2>{CATEGORY_LABELS.llm}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Item</th>
                      <th>Credits per 1K input tokens</th>
                      <th>Credits per 1K output tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processLLMData(data.llm).map((row, idx) => <tr key={`llm-self-serve-${idx}`}>
                        <td>{normalizeVendor(row.vendor)}</td>
                        <td>{row.item}</td>
                        <td>{formatCredits(row.input?.value, row.input?.priorityValue, 'selfServe')}</td>
                        <td>{formatCredits(row.output?.value, row.output?.priorityValue, 'selfServe')}</td>
                      </tr>)}
                  </tbody>
                </table>
              </>}

            {data.asr && data.asr.length > 0 && <>
                <h2>{CATEGORY_LABELS.asr}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Item</th>
                      <th>Unit</th>
                      <th>Credits per unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processData(data.asr, 'asr').map((row, idx) => <tr key={`asr-self-serve-${idx}`}>
                        <td>{normalizeVendor(row.vendor)}</td>
                        <td>{getItemName(row.item, row.vendor, 'asr')}</td>
                        <td>{formatUnit(row.unit)}</td>
                        <td>{formatCredits(row.value, row.priorityValue, 'selfServe')}</td>
                      </tr>)}
                  </tbody>
                </table>
              </>}

            {data.tts && data.tts.length > 0 && <>
                <h2>{CATEGORY_LABELS.tts}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Item</th>
                      <th>Unit</th>
                      <th>Credits per unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processData(data.tts, 'tts').map((row, idx) => <tr key={`tts-self-serve-${idx}`}>
                        <td>{normalizeVendor(row.vendor)}</td>
                        <td>{getItemName(row.item, row.vendor, 'tts')}</td>
                        <td>{formatUnit(row.unit)}</td>
                        <td>{formatCredits(row.value, row.priorityValue, 'selfServe')}</td>
                      </tr>)}
                  </tbody>
                </table>
              </>}
          </>
        </Tab>
        <Tab title="Enterprise pricing">
          <>
            <h2>{CATEGORY_LABELS.orchestration}</h2>
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Item</th>
                  <th>Unit</th>
                  <th>Credits per unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RelVoca</td>
                  <td>Chat usage</td>
                  <td>Every time a user sends a message, or a request is sent to the Conversations API (excluding launch events).</td>
                  <td>{formatCredits(orchestrationItems.interaction?.value ?? 1, orchestrationItems.interaction?.priorityValue, 'enterprise')}</td>
                </tr>
                <tr>
                  <td>RelVoca</td>
                  <td>No-reply usage</td>
                  <td>Every time a message is sent by the no-reply feature. While no-reply messages are not charged for, if generative no-reply features are used, you will be charged credits for LLM usage.</td>
                  <td>{formatDisplayValue(0, 'enterprise')}</td>
                </tr>
                <tr>
                  <td>RelVoca</td>
                  <td>Phone usage</td>
                  <td>Minutes on phone calls</td>
                  <td>{formatCredits(orchestrationItems.audio?.value ?? 10, orchestrationItems.audio?.priorityValue, 'enterprise')}</td>
                </tr>
              </tbody>
            </table>

            {data.llm && data.llm.length > 0 && <>
                <h2>{CATEGORY_LABELS.llm}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Item</th>
                      <th>Credits per 1K input tokens</th>
                      <th>Credits per 1K output tokens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processLLMData(data.llm).map((row, idx) => <tr key={`llm-enterprise-${idx}`}>
                        <td>{normalizeVendor(row.vendor)}</td>
                        <td>{row.item}</td>
                        <td>{formatCredits(row.input?.value, row.input?.priorityValue, 'enterprise')}</td>
                        <td>{formatCredits(row.output?.value, row.output?.priorityValue, 'enterprise')}</td>
                      </tr>)}
                  </tbody>
                </table>
              </>}

            {data.asr && data.asr.length > 0 && <>
                <h2>{CATEGORY_LABELS.asr}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Item</th>
                      <th>Unit</th>
                      <th>Credits per unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processData(data.asr, 'asr').map((row, idx) => <tr key={`asr-enterprise-${idx}`}>
                        <td>{normalizeVendor(row.vendor)}</td>
                        <td>{getItemName(row.item, row.vendor, 'asr')}</td>
                        <td>{formatUnit(row.unit)}</td>
                        <td>{formatCredits(row.value, row.priorityValue, 'enterprise')}</td>
                      </tr>)}
                  </tbody>
                </table>
              </>}

            {data.tts && data.tts.length > 0 && <>
                <h2>{CATEGORY_LABELS.tts}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Item</th>
                      <th>Unit</th>
                      <th>Credits per unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processData(data.tts, 'tts').map((row, idx) => <tr key={`tts-enterprise-${idx}`}>
                        <td>{normalizeVendor(row.vendor)}</td>
                        <td>{getItemName(row.item, row.vendor, 'tts')}</td>
                        <td>{formatUnit(row.unit)}</td>
                        <td>{formatCredits(row.value, row.priorityValue, 'enterprise')}</td>
                      </tr>)}
                  </tbody>
                </table>
              </>}
          </>
        </Tab>
      </Tabs>
    </>;
};

Credits are the currency that powers your RelVoca agent. Every interaction, from chat messages to LLM calls to voice minutes, consumes a certain number of credits depending on the vendor and model you use. The tables below show current credit costs so you can estimate usage and plan accordingly.

<CreditsPricingTable />
