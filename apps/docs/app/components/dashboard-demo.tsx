'use client';

import * as React from 'react';

import { Badge } from '@/registry/hairline/ui/badge';
import { Button } from '@/registry/hairline/ui/button';
import { Chip } from '@/registry/hairline/ui/chip';
import { DataRow } from '@/registry/hairline/ui/data-row';
import { MeterBar } from '@/registry/hairline/ui/meter-bar';
import { SegmentedTabs } from '@/registry/hairline/ui/segmented-tabs';
import { StatBlock } from '@/registry/hairline/ui/stat-block';
import { TickingFigure } from '@/registry/hairline/ui/ticking-figure';
import { Tile } from '@/registry/hairline/ui/tile';

const TRANSACTIONS = [
  { name: 'School fees — second term', meta: '22 Mar · Mobile money', dot: 'var(--a-coral)', amount: '−258 900', secondary: '227 400', state: 'alarm' as const },
  { name: 'Fibre bill', meta: '18 Mar · Duplicate', dot: 'var(--a-blue)', amount: '−34 000', secondary: '486 300', badge: true },
  { name: 'Salary', meta: '01 Mar · MTN MoMo', dot: 'var(--a-green)', amount: '750 000', secondary: '520 300' },
  { name: 'Transport', meta: 'Settled', amount: '−12 500', secondary: '507 800', state: 'demoted' as const },
];

const BUDGETS = [
  { name: 'School fees', spent: 258900, limit: 240000, over: true },
  { name: 'Bills', spent: 142000, limit: 200000 },
  { name: 'Food', spent: 98000, limit: 160000 },
];

/**
 * The showcase: a real overview screen built only from Hairline components.
 *
 * This is the argument for the library — not a grid of variants, but the thing you
 * would actually ship, at real density with real numbers.
 */
export function DashboardDemo() {
  const [range, setRange] = React.useState('Month');

  return (
    <div className="bg-desk rounded-board p-s9 md:p-s11">
      <div className="flex items-center justify-between gap-s9 mb-s11 flex-wrap">
        <SegmentedTabs items={['Month', 'Quarter', 'Year']} value={range} onChange={setRange} />
        <div className="flex items-center gap-s5">
          <Chip interactive={false}>XAF</Chip>
          <Button tone="solid" size="s">Record it</Button>
        </div>
      </div>

      <div className="grid gap-gap-tile lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-gap-tile">
          <Tile tone="dark" label="Available">
            <div className="flex items-baseline gap-s5">
              <span className="type-figure-xl tracking-figure text-on-inverse">
                <TickingFigure value={227400} />
              </span>
              <span className="type-data-s tracking-unit uppercase text-white/50">XAF</span>
            </div>
            <p className="type-body-s text-white/60 mt-s6 mb-0 max-w-[38ch]">
              Your money runs out on 22 March — the day the school fees are due.
            </p>
          </Tile>

          <div className="grid grid-cols-2 gap-gap-tile">
            <Tile label="This month">
              <StatBlock size="s" value={<TickingFigure value={1284900} />} note="Nothing saved this month." />
            </Tile>
            <Tile tone="alarm" label="Shortfall">
              <StatBlock size="s" tone="alarm" value={<TickingFigure value={-258900} />} note="258 900 is the deferred fees." />
            </Tile>
          </div>

          <Tile label="Where it went">
            <MeterBar
              segments={[
                { label: 'School fees', amount: 258900, color: 'var(--a-coral)' },
                { label: 'Bills', amount: 142000, color: 'var(--a-blue)' },
                { label: 'Food', amount: 98000, color: 'var(--a-amber)' },
                { label: 'Transport', amount: 42000, color: 'var(--a-green)' },
              ]}
            />
            <div className="flex flex-wrap gap-s7 mt-s7">
              {[
                ['School fees', 'var(--a-coral)', '41 %'],
                ['Bills', 'var(--a-blue)', '23 %'],
                ['Food', 'var(--a-amber)', '16 %'],
                ['Transport', 'var(--a-green)', '7 %'],
              ].map(([label, color, pct]) => (
                <span key={label} className="flex items-center gap-s3">
                  <span className="size-dot rounded-full" style={{ background: color }} />
                  <span className="type-body-s text-body">{label}</span>
                  <span className="type-data-s text-muted">{pct}</span>
                </span>
              ))}
            </div>
          </Tile>
        </div>

        <div className="flex flex-col gap-gap-tile">
          <Tile tone="paper" label="Needs a decision" action={<Badge tone="alarm">1</Badge>}>
            <div className="type-item text-strong">Pay the school fees today?</div>
            <p className="type-body-s text-muted mt-s4 mb-s9">
              Paying both today leaves nothing until the 28th.
            </p>
            <div className="flex gap-s5">
              <Button size="s" tone="solid">Pay it</Button>
              <Button size="s" tone="quiet">Move to April</Button>
            </div>
          </Tile>

          <Tile label="Last transactions">
            <div className="-mt-s3">
              {TRANSACTIONS.map((t) => (
                <DataRow
                  key={t.name}
                  dot={t.dot}
                  name={t.name}
                  meta={t.meta}
                  state={t.state}
                  amount={t.amount}
                  secondary={t.secondary}
                  badge={t.badge ? <Badge tone="info">Disputed</Badge> : undefined}
                />
              ))}
            </div>
          </Tile>

          <Tile label="Budgets">
            <div className="flex flex-col gap-s9">
              {BUDGETS.map((b) => (
                <div key={b.name}>
                  <div className="flex items-baseline justify-between gap-s5 mb-s4">
                    <span className="type-body-s text-body">{b.name}</span>
                    <span className="type-data-s text-muted">
                      <span className={b.over ? 'text-alarm' : undefined}>
                        {b.spent.toLocaleString('fr-FR').replace(/ | /g, ' ')}
                      </span>
                      {' / '}
                      {b.limit.toLocaleString('fr-FR').replace(/ | /g, ' ')}
                    </span>
                  </div>
                  <MeterBar value={b.spent} limit={b.limit} over={b.over} />
                </div>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
}
