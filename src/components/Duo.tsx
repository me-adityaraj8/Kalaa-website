import type { ElementType } from 'react';
import { langAttr, otherLang, useLang, type L } from '../lib/i18n';

type Props = {
  text: L;
  as?: ElementType;
  className?: string;
  /** Classes for the small line in the other language. */
  subClassName?: string;
  /** Put the other-language line under the main one instead of above. */
  subBelow?: boolean;
};

/**
 * A heading in both languages, the way Bihar's shop boards are painted:
 * the reader's language big, the other one small alongside it.
 */
export default function Duo({ text, as: Tag = 'h2', className, subClassName = 'kicker', subBelow }: Props) {
  const { lang } = useLang();
  const other = otherLang(lang);
  const sub = (
    <span lang={langAttr(other)} className={`block ${subClassName}`}>
      {text[other]}
    </span>
  );
  return (
    <Tag className={className}>
      {!subBelow && sub}
      <span lang={langAttr(lang)} className="block">
        {text[lang]}
      </span>
      {subBelow && sub}
    </Tag>
  );
}
