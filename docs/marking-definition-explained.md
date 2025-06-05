# What is a Marking Definition in Threat Intelligence?

A **marking definition** in threat intelligence is a formal, standardized mechanism for specifying how information should be handled, shared, disseminated, or protected. Marking definitions are crucial for ensuring that sensitive threat intelligence is only shared with appropriate parties and is handled according to legal, regulatory, or organizational requirements.

## Purpose

- **Data Handling:** Marking definitions provide explicit instructions on how data should be treated, such as who can access it, how it can be distributed, and what restrictions apply.
- **Information Sharing:** They enable organizations to share threat intelligence with partners, vendors, or the public while maintaining control over sensitive information.
- **Compliance:** Markings help organizations comply with regulations, contractual obligations, or internal policies regarding data privacy and security.

## Common Marking Schemes

The most widely used marking scheme in cyber threat intelligence is the **Traffic Light Protocol (TLP)**, which uses color codes to indicate sharing boundaries:

- **TLP:CLEAR** – Information can be shared freely and is not sensitive.
- **TLP:WHITE** – Information can be distributed to the public, with minimal restrictions.
- **TLP:GREEN** – Information can be shared within the community, but not published publicly.
- **TLP:AMBER** – Information is restricted to specific organizations or individuals.
- **TLP:RED** – Information is highly sensitive and should only be shared with specific recipients on a need-to-know basis.

Other marking schemes may include proprietary or regulatory markings, such as "CONFIDENTIAL", "RESTRICTED", or sector-specific labels.

## Marking Definitions in STIX

In the [STIX](https://oasis-open.github.io/cti-documentation/stix/intro) (Structured Threat Information Expression) standard, a **Marking Definition** is a special object that defines a marking and its semantics. Other STIX objects (such as indicators, malware, threat actors, etc.) can reference one or more marking definitions using the `object_marking_refs` property.

### Example

```json
{
  "type": "indicator",
  "id": "indicator--1234...",
  "name": "Malicious IP",
  "object_marking_refs": [
    "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82"
  ]
}
```

Here, the indicator references a marking definition (e.g., TLP:AMBER) by its ID. The actual marking definition object might look like:

```json
{
  "type": "marking-definition",
  "id": "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82",
  "created": "2017-01-20T00:00:00.000Z",
  "definition_type": "tlp",
  "definition": {
    "tlp": "amber"
  }
}
```

### How It Works

- **Marking Definition Objects:** Define the meaning and scope of a marking (e.g., TLP:AMBER).
- **References:** Other objects use `object_marking_refs` to point to relevant marking definitions.
- **Enforcement:** Consumers of the data are expected to enforce the handling instructions specified by the marking definitions.

## Why Are Marking Definitions Important?

- **Trust:** They build trust between sharing partners by ensuring data is handled as intended.
- **Automation:** Enable automated systems to enforce data handling rules.
- **Auditability:** Provide a clear record of how data should be treated, supporting audits and investigations.

## Summary

A marking definition is a foundational concept in threat intelligence sharing, enabling organizations to communicate and enforce data handling requirements in a standardized, machine-readable way. By using marking definitions, organizations can confidently share threat intelligence while maintaining control over sensitive information.
